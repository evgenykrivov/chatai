import React from "react"
import styles from "./ChatCard.module.scss"
import { CircleX } from "lucide-react"

type ChatCardProps = {
  id: string
  avatar: string
  name: string
  lastMessage: string
  timestamp: string // Уже форматированное время
  onClick: () => void
  onDelete: (event: React.MouseEvent<HTMLButtonElement>, id: string) => void
}

const ChatCard: React.FC<ChatCardProps> = ({
  id,
  avatar,
  name,
  lastMessage,
  timestamp,
  onClick,
  onDelete,
}) => (
  <div className={styles.chatCard} onClick={onClick}>
    <div className={styles.chatAvatar}>
      <img src={avatar} alt={name} />
    </div>
    <div className={styles.chatDetails}>
      <h3 className={styles.chatName}>{name}</h3>
      <p className={styles.chatLastMessage}>{lastMessage}</p>
    </div>
    <button
      className={styles.deleteButton}
      onClick={(event) => onDelete(event, id)}
    >
      <CircleX />
    </button>
    <div className={styles.chatTimestamp}>{timestamp}</div>
  </div>
)

export default ChatCard
