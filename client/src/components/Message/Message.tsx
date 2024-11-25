import React from "react"
import ReactMarkdown from "react-markdown"
import styles from "./Message.module.scss"

type MessageProps = {
  content: string
  sender: "bot" | "user"
  isError?: boolean
}

const Message: React.FC<MessageProps> = ({ content, sender, isError }) => {
  return (
    <div
      className={`${styles.message} ${
        sender === "bot" ? styles.bot : isError ? styles.error : styles.user
      } ${isError && styles.error}`}
    >
      {sender === "bot" ? <ReactMarkdown>{content}</ReactMarkdown> : content}
    </div>
  )
}

export default Message
