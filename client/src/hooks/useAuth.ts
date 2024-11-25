import { useAppDispatch, useAppSelector } from "@/app/hooks"
import {
  useLoginMutation,
  useLogoutMutation,
} from "@/entities/user/api/userApi"
import { ERoute } from "@/routes/constants"
import { useNavigate } from "react-router-dom"

export const useAuth = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { accessToken } = useAppSelector((state) => state.auth)

  const [login, loginState] = useLoginMutation()
  const [logout, logoutState] = useLogoutMutation()

  const isAuthenticated = !!accessToken

  const handleLogin = async (credentials: {
    email: string
    password: string
  }) => {
    try {
      const data = await login(credentials).unwrap()
      navigate(ERoute.ChatListPage)
      return data
    } catch (error) {
      console.error("Login failed", error)
      throw error
    }
  }

  const handleLogout = async () => {
    try {
      await logout().unwrap()
      navigate(ERoute.LoginPage)
    } catch (error) {
      console.error("Logout failed", error)
    }
  }

  return {
    isAuthenticated,
    login: handleLogin,
    logout: handleLogout,
    loginState,
    logoutState,
  }
}
