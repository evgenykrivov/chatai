import React, { useState } from "react"
import styles from "./ChatCreationPopup.module.scss"

interface ChatCreationPopupProps {
  isOpen: boolean
  onClose: () => void
  onCreateChat: (name: string, avatar: string) => void
}

const ChatCreationPopup: React.FC<ChatCreationPopupProps> = ({
  isOpen,
  onClose,
  onCreateChat,
}) => {
  const [newChatName, setNewChatName] = useState("")
  const [newChatAvatar, setNewChatAvatar] = useState("")

  const handleCreateChat = () => {
    if (!newChatName.trim()) {
      alert("Chat name is required")
      return
    }
    onCreateChat(newChatName, newChatAvatar)
    setNewChatName("")
    setNewChatAvatar("")
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <h3 className={styles.title}>Create New Chat</h3>
        <input
          type="text"
          placeholder="Chat Name"
          value={newChatName}
          onChange={(e) => setNewChatName(e.target.value)}
          className={styles.input}
        />
        <button onClick={handleCreateChat} className={styles.createButton}>
          Create Chat
        </button>
        <button onClick={onClose} className={styles.closeButton}>
          Close
        </button>
      </div>
    </div>
  )
}

export default ChatCreationPopup
