import { Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "@/hooks"
import { useRefreshMutation } from "@/entities/user/api/userApi"
import { useEffect, useState } from "react"
import { ERoute } from "@/routes/constants"
import { LayoutWrapper } from "@/layouts/components/LayoutWrapper/LayoutWrapper"

const MainLayout = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true) // Состояние загрузки
  const { isAuthenticated } = useAuth() // Проверка авторизации
  const navigate = useNavigate()
  const [refresh] = useRefreshMutation()

  useEffect(() => {
    const handleRefresh = async () => {
      try {
        if (!isAuthenticated) {
          const res = await refresh().unwrap() // Пытаемся обновить токен
          if (res?.access_token) {
            console.log("Refresh successful")
          } else {
            throw new Error("No access token")
          }
        }
      } catch (err) {
        console.error("Failed to refresh token", err)
      } finally {
        setIsLoading(false) // Устанавливаем состояние загрузки
      }
    }

    handleRefresh() // Выполняем проверку авторизации

    // Зависимости `useEffect`
  }, [isAuthenticated, refresh, navigate])

  // Показ индикатора загрузки до завершения проверки
  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <LayoutWrapper>
      <Outlet />
    </LayoutWrapper>
  )
}

export default MainLayout
