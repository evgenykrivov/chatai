import React from "react"
import styles from "./ChatListPage.module.scss"
import { useNavigate } from "react-router-dom"
import { ERoute } from "@/routes/constants"
import { useGetChatsQuery } from "@/entities/user/api/chatApi"

const ChatListPage: React.FC = () => {
  const navigate = useNavigate()
  const { data: chats = [], isLoading, error } = useGetChatsQuery(undefined)

  const handleChatClick = (chatId: string) => {
    navigate(`${ERoute.ChatPage}/${chatId}`)
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading chats</div>

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Chats</h2>
      <div className={styles.chatList}>
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={styles.chatItem}
            onClick={() => handleChatClick(chat.id)}
          >
            <div className={styles.chatAvatar}>
              <img src={chat.avatar} alt={chat.name} />
            </div>
            <div className={styles.chatDetails}>
              <h3 className={styles.chatName}>{chat.name}</h3>
              <p className={styles.chatLastMessage}>
                {chat.messages.length > 0
                  ? chat.messages[chat.messages.length - 1].content
                  : "No messages yet"}
              </p>
            </div>
            <div className={styles.chatTimestamp}>
              {new Date(chat.timestamp).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChatListPage
