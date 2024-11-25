import React, { useEffect, useRef, useState } from "react"
import styles from "./ChatPage.module.scss"
import { useChat } from "@/hooks/useChat"
import Message from "@/components/Message/Message"
import MessageInput from "@/components/MessageInput/MessageInput"
import { MessageTypesApi } from "@/entities/chat/chatTypesApi"

const ChatPage: React.FC = () => {
  const {
    messages,
    input,
    isBotLoading,
    isBotTyping,
    handleInputChange,
    handleSendMessage,
    isLoading,
    error,
  } = useChat()

  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  const [inputHeight, setInputHeight] = useState(0) // Состояние для высоты инпута

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isBotLoading, isBotTyping, inputHeight])

  if (isLoading) return <div>Loading chat...</div>
  if (error) return <div>Error loading chat</div>

  return (
    <div className={styles.container}>
      <div
        className={styles.messages}
        style={{ marginBottom: `${inputHeight}px` }} // Динамический нижний отступ
      >
        {messages.map((message: MessageTypesApi) => (
          <Message
            key={message.id}
            content={message.content}
            sender={
              ["bot", "user"].includes(message.sender) ? message.sender : "user"
            }
            isError={false}
          />
        ))}
        {isBotLoading && <span>Loading...</span>}
        {isBotTyping && <span>Bot is typing...</span>}
        <div ref={messagesEndRef} />
      </div>
      <MessageInput
        input={input}
        onChange={handleInputChange}
        onSend={handleSendMessage}
        setHeight={setInputHeight} // Передаём функцию обновления высоты
      />
    </div>
  )
}

export default ChatPage
