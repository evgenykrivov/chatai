import { Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "@/hooks"
import { useRefreshMutation } from "@/entities/user/api/userApi"
import { useEffect, useState } from "react"
import { ERoute } from "@/routes/constants"
import { LayoutWrapper } from "@/layouts/components/LayoutWrapper/LayoutWrapper"

const MainLayout = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true) // Состояние загрузки
  const isAuth = useAuth()
  const navigate = useNavigate()
  const [refresh] = useRefreshMutation()

  useEffect(() => {
    // Проверяем авторизацию
    if (!isAuth) {
      const handleRefresh = async () => {
        try {
          const res = await refresh().unwrap() // Unwrap корректно обрабатывает RTK Query
          if (res?.access_token) {
            // Если токен обновлен, остаемся на текущей странице
            console.log("Refresh successful")
          } else {
            navigate(ERoute.LoginPage) // Если нет токена, отправляем на логин
          }
        } catch (err) {
          console.error("Failed to refresh token", err)
          navigate(ERoute.LoginPage) // Перенаправляем на логин при ошибке
        } finally {
          setIsLoading(false) // Завершаем загрузку
        }
      }

      handleRefresh()
    } else {
      setIsLoading(false) // Если авторизован, завершаем загрузку
    }
  }, [isAuth, refresh, navigate])

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
