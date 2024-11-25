import { Link, useLocation } from "react-router-dom"
import styles from "./Header.module.scss"
import ChatCreationPopup from "@/components/ChatCreationPopup/ChatCreationPopup"
import { LogOut, PencilLine, Undo2 } from "lucide-react"
import React, { useState } from "react"
import { ERoute } from "@/routes/constants"
import { useHeader } from "@/hooks/useHeader"

export const Header = () => {
  const { handleLogout, handleCreateChat, isCreating } = useHeader()
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const location = useLocation()
  const isChatListPage = location.pathname.startsWith(ERoute.ChatListPage)

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Link className={styles.logo} to={ERoute.ChatListPage}>
          {isChatListPage ? "HOME" : <Undo2 size={24} />}
        </Link>
      </div>
      <div className={styles.actions}>
        <button
          className={styles.createButton}
          onClick={() => setIsPopupOpen(true)}
          disabled={isCreating}
        >
          <p>Create New Chat</p>
          <PencilLine />
        </button>
        <button className={styles.logoutButton} onClick={handleLogout}>
          <p>Logout</p>
          <LogOut />
        </button>
      </div>
      <ChatCreationPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onCreateChat={handleCreateChat}
      />
    </header>
  )
}
