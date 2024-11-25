import {
  useDeleteChatMutation,
  useGetChatsQuery,
} from "@/entities/user/api/chatApi"
import React from "react"
import { Chat } from "@/entities/chat/chatTypesApi"

export const useChatList = () => {
  const { data: chats = [], isLoading, error } = useGetChatsQuery(undefined)
  const [deleteChat] = useDeleteChatMutation()

  const processedChats = chats.map((chat: Chat) => {
    const lastMessage =
      chat.messages.length > 0 ? chat.messages[chat.messages.length - 1] : null

    return {
      ...chat,
      lastMessage: lastMessage?.content || "No messages yet",
      timestamp: lastMessage?.timestamp || chat.timestamp,
    }
  })

  const handleDeleteChat = async (
    event: React.MouseEvent<HTMLButtonElement>,
    chatId: string,
  ) => {
    event.stopPropagation()
    try {
      await deleteChat(chatId).unwrap()
    } catch (err) {
      console.error("Failed to delete chat:", err)
    }
  }

  return { chats: processedChats, isLoading, error, handleDeleteChat }
}
