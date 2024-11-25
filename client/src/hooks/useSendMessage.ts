import { Dispatch, SetStateAction } from "react"
import { fetchBotReplyAPI } from "@/entities/user/api/apiUtils"

type Message = {
  id: string
  content: string
  sender: string
  isTemporary?: boolean
  isError?: boolean
}

export const sendMessage = async (
  chatId: string,
  input: string,
  setMessages: Dispatch<SetStateAction<Message[]>>,
  addMessage: (payload: {
    chatId: string
    message: { content: string; sender: string }
  }) => Promise<Message>,
) => {
  if (!input.trim() || !chatId) return

  const tempId = Date.now().toString()
  const userMessage: Message = {
    id: tempId,
    content: input,
    sender: "user",
    isTemporary: true,
  }

  setMessages((prev) => [...prev, userMessage])

  try {
    const savedMessage = await addMessage({
      chatId,
      message: { content: input, sender: "user" },
    })

    setMessages((prev) =>
      prev.map((msg) => (msg.id === tempId ? savedMessage : msg)),
    )

    const botReply = await fetchBotReplyAPI(input)
    if (botReply) {
      const botMessage: Message = {
        content: botReply,
        sender: "bot",
        id: Date.now().toString(),
      }

      const savedBotMessage = await addMessage({
        chatId,
        message: botMessage,
      })

      setMessages((prev) => [...prev, savedBotMessage])
    }
  } catch (err) {
    console.error("Failed to send message:", err)
    setMessages((prev) =>
      prev.map((msg) => (msg.id === tempId ? { ...msg, isError: true } : msg)),
    )
  }
}
