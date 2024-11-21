import { Link, useNavigate } from "react-router-dom"
import { ERoute } from "@/routes/constants"
import { useLogoutMutation, userApi } from "@/entities/user/api/userApi"
import { chatApi, useCreateChatMutation } from "@/entities/user/api/chatApi"
import { useAppDispatch } from "@/app/hooks"
import styles from "./Header.module.scss"
import ChatCreationPopup from "@/components/ChatCreationPopup/ChatCreationPopup"
import React, { useState } from "react"

export const Header = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [logout] = useLogoutMutation()

  const [createChat, { isLoading: isCreating }] = useCreateChatMutation()

  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await logout().unwrap()
      dispatch(userApi.util.resetApiState())
      dispatch(chatApi.util.resetApiState())
      navigate(ERoute.LoginPage)
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  const handleCreateChat = async (name: string, avatar: string) => {
    try {
      const newChat = await createChat({
        name,
        avatar:
          avatar ||
          "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/1024px-ChatGPT_logo.svg.png",
      }).unwrap()
      navigate(`${ERoute.ChatPage}/${newChat.id}`) // Перенаправление на страницу нового чата
    } catch (err) {
      console.error("Failed to create chat:", err)
    }
  }

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Link className={styles.logo} to={ERoute.ChatListPage}>
          HOME
        </Link>
      </div>
      <div className={styles.actions}>
        <button
          className={styles.createButton}
          onClick={() => setIsPopupOpen(true)}
        >
          Create New Chat
        </button>
        <button className={styles.logoutButton} onClick={handleLogout}>
          Logout
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
