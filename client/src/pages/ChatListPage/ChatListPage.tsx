import React from "react"
import styles from "./ChatListPage.module.scss"
import { useNavigate } from "react-router-dom"
import { ERoute } from "@/routes/constants"
import ChatCard from "@/components/chatItem/ChatCard"
import { useChatList } from "@/hooks/useChatList"
import { Chat } from "@/entities/chat/chatTypesApi"
import { formatRelativeTime } from "@/utils/formatRelativeTime"

const ChatListPage: React.FC = () => {
  const navigate = useNavigate()
  const { chats, isLoading, error, handleDeleteChat } = useChatList()

  const handleChatClick = (chatId: string) => {
    navigate(`${ERoute.ChatPage}/${chatId}`)
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading chats</div>

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Chats</h2>
      <div className={styles.chatList}>
        {chats.map((chat: Chat) => (
          <ChatCard
            key={chat.id}
            id={chat.id}
            avatar={chat.avatar}
            name={chat.name}
            lastMessage={
              chat.messages.length > 0
                ? chat.messages[chat.messages.length - 1].content
                : "No messages yet"
            }
            timestamp={formatRelativeTime(chat.timestamp)}
            onClick={() => handleChatClick(chat.id)}
            onDelete={handleDeleteChat}
          />
        ))}
      </div>
    </div>
  )
}

export default ChatListPage
