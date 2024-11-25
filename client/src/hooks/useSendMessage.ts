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

  const tempId = Date.now().toString() // Уникальный временный ID
  const userMessage: Message = {
    id: tempId,
    content: input,
    sender: "user",
    isTemporary: true, // Метка временного сообщения
  }

  // Добавляем временное сообщение
  setMessages((prev) => [...prev, userMessage])

  try {
    // Сохраняем сообщение пользователя
    const savedMessage = await addMessage({
      chatId,
      message: { content: input, sender: "user" },
    })

    // Заменяем временное сообщение на сохранённое
    setMessages((prev) =>
      prev.map((msg) => (msg.id === tempId ? savedMessage : msg)),
    )

    // Получаем ответ бота
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
    // Если ошибка, помечаем сообщение как ошибочное
    setMessages((prev) =>
      prev.map((msg) => (msg.id === tempId ? { ...msg, isError: true } : msg)),
    )
  }
}
