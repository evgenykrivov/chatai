import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import {
  useAddMessageMutation,
  useGetChatByIdQuery,
} from "@/entities/user/api/chatApi"
import { MessageTypesApi } from "@/entities/chat/chatTypesApi"

export const useChat = () => {
  const { id } = useParams<{ id: string }>()
  const { data: chatData, isLoading, error } = useGetChatByIdQuery(id || "")
  const [addMessage] = useAddMessageMutation()
  const [messages, setMessages] = useState<MessageTypesApi[]>(
    chatData?.messages || [],
  )
  const [input, setInput] = useState("")
  const [isBotLoading, setIsBotLoading] = useState(false)
  const [isBotTyping, setIsBotTyping] = useState(false)

  useEffect(() => {
    if (chatData?.messages) {
      setMessages(chatData.messages)
    }
  }, [chatData])

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }

  const handleSendMessage = async () => {
    if (!input.trim() || !id) return

    const tempId = Date.now().toString()
    const userMessage: MessageTypesApi = {
      id: tempId,
      content: input,
      sender: "user",
      isTemporary: true,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")

    try {
      const savedUserMessage = await addMessage({
        chatId: id,
        message: { content: input, sender: "user" },
      }).unwrap()

      setMessages((prev) =>
        prev.map((msg) => (msg.id === tempId ? savedUserMessage : msg)),
      )

      setIsBotLoading(true)

      let botMessageContent = ""
      await fetchBotReplyStream(input, (partialContent) => {
        setIsBotLoading(false)
        setIsBotTyping(true)

        botMessageContent += partialContent

        setMessages((prev) => {
          const existingBotMessage = prev.find(
            (msg) => msg.sender === "bot" && msg.isTemporary,
          )

          if (existingBotMessage) {
            return prev.map((msg) =>
              msg === existingBotMessage
                ? { ...msg, content: botMessageContent + "..." }
                : msg,
            )
          } else {
            const botTempMessage: MessageTypesApi = {
              id: "bot-temp",
              content: botMessageContent + "...",
              sender: "bot",
              isTemporary: true,
            }
            return [...prev, botTempMessage]
          }
        })
      })

      // Сохранение ответа бота в базу данных
      const savedBotMessage = await addMessage({
        chatId: id,
        message: { content: botMessageContent, sender: "bot" },
      }).unwrap()

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === "bot-temp"
            ? { ...msg, ...savedBotMessage, isTemporary: false }
            : msg,
        ),
      )

      setIsBotTyping(false)
    } catch (err) {
      console.error("Failed to send message or save bot reply:", err)

      // Обработка ошибки: добавляем временное сообщение с отметкой об ошибке
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          content: "An error occurred while generating a response.",
          sender: "bot",
          isTemporary: true,
          isError: true, // Дополнительное свойство для отображения ошибки
        },
      ])

      setIsBotLoading(false)
      setIsBotTyping(false)
    }
  }

  const fetchBotReplyStream = async (
    userInput: string,
    onPartialResponse: (partialContent: string) => void,
  ): Promise<string> => {
    let fullResponse = ""
    try {
      const response = await fetch(import.meta.env.VITE_API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [{ role: "user", content: userInput }],
          max_tokens: 256,
          stream: true,
        }),
      })

      if (!response.ok) {
        throw new Error(`API returned status ${response.status}`)
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder("utf-8")

      if (reader) {
        let buffer = ""

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          buffer += decoder.decode(value, { stream: true })

          const lines = buffer.split("\n")
          buffer = lines.pop() || ""

          for (const line of lines) {
            const trimmedLine = line.trim()
            if (trimmedLine.startsWith("data: ")) {
              const jsonString = trimmedLine.replace(/^data: /, "")

              try {
                const parsedChunk = JSON.parse(jsonString)
                const content = parsedChunk.choices?.[0]?.delta?.content
                if (content) {
                  fullResponse += content
                  onPartialResponse(content)
                }
              } catch (err) {
                console.error(
                  "Error parsing chunk:",
                  err,
                  "Raw line:",
                  trimmedLine,
                )
              }
            }
          }
        }
      }
    } catch (err) {
      console.error("Failed to fetch bot reply:", err)
      throw err // Выброс ошибки для обработки в handleSendMessage
    }
    return fullResponse
  }

  return {
    messages,
    input,
    isBotLoading,
    isBotTyping,
    handleInputChange,
    handleSendMessage,
    isLoading,
    error,
  }
}
