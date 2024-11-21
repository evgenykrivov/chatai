import React, { useEffect, useRef, useState } from "react"
import styles from "./ChatPage.module.scss"
import { useParams } from "react-router-dom"
import {
  useAddMessageMutation,
  useGetChatByIdQuery,
} from "@/entities/user/api/chatApi"
import { ArrowUp } from "lucide-react"

const ChatPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { data: chatData, isLoading, error } = useGetChatByIdQuery(id || "")
  const [addMessage] = useAddMessageMutation()
  const [messages, setMessages] = useState(chatData?.messages || [])
  const [input, setInput] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (chatData?.messages) {
      setMessages(chatData.messages) // Обновляем локальное состояние при изменении данных из API
    }
  }, [chatData])

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }

  const handleSendMessage = async () => {
    if (!input.trim() || !id) return

    const tempId = Date.now().toString() // Уникальный временный ID
    const userMessage = {
      id: tempId,
      content: input,
      sender: "user",
      isTemporary: true, // Метка временного сообщения
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("") // Очищаем поле ввода

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
    }

    try {
      const savedMessage = await addMessage({
        chatId: id,
        message: { content: input, sender: "user" },
      }).unwrap()

      setMessages((prev) =>
        prev.map((msg) => (msg.id === tempId ? savedMessage : msg)),
      )

      const botReply = await fetchBotReply(input)
      if (botReply) {
        const botMessage = {
          content: botReply,
          sender: "bot",
        }
        const savedBotMessage = await addMessage({
          chatId: id,
          message: botMessage,
        }).unwrap()

        setMessages((prev) => [...prev, savedBotMessage])
      }
    } catch (err) {
      console.error("Failed to send message:", err)
      // Если ошибка, помечаем сообщение как ошибочное
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === tempId ? { ...msg, isError: true } : msg,
        ),
      )
    }
  }

  const fetchBotReply = async (userInput: string): Promise<string | null> => {
    try {
      const response = await fetch("https://api.aimlapi.com/chat/completions", {
        method: "POST",
        headers: {
          Authorization: "Bearer cf3c7438b1bd4925851ab0b1cc41f8e1",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [{ role: "user", content: userInput }],
          max_tokens: 256,
          stream: false,
        }),
      })
      const data = await response.json()
      return data?.choices?.[0]?.message?.content || null
    } catch (err) {
      console.error("Failed to fetch bot reply:", err)
      return null
    }
  }

  if (isLoading) return <div>Loading chat...</div>
  if (error) return <div>Error loading chat</div>

  return (
    <div className={styles.container}>
      <div className={styles.messages}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${styles.message} ${
              message.sender === "bot"
                ? styles.bot
                : message.isError
                ? styles.error // Красим сообщение при ошибке
                : styles.user
            }`}
          >
            {message.content}
          </div>
        ))}
      </div>
      <div className={styles.inputContainer}>
        <textarea
          ref={textareaRef}
          className={styles.input}
          value={input}
          onChange={handleInputChange}
          placeholder="Type your message..."
          rows={1}
        />
        {input && (
          <button className={styles.button} onClick={handleSendMessage}>
            <ArrowUp size={16} />
          </button>
        )}
      </div>
    </div>
  )
}

export default ChatPage
