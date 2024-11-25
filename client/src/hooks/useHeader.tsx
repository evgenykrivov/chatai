import { useNavigate } from "react-router-dom"
import { useLogoutMutation, userApi } from "@/entities/user/api/userApi"
import { chatApi, useCreateChatMutation } from "@/entities/user/api/chatApi"
import { useAppDispatch } from "@/app/hooks"
import { ERoute } from "@/routes/constants"

export const useHeader = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [logout] = useLogoutMutation()
  const [createChat, { isLoading: isCreating }] = useCreateChatMutation()

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
      navigate(`${ERoute.ChatPage}/${newChat.id}`)
    } catch (err) {
      console.error("Failed to create chat:", err)
    }
  }

  return {
    handleLogout,
    handleCreateChat,
    isCreating,
  }
}
