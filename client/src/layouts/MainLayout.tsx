import { Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "@/hooks"
import { useRefreshMutation } from "@/entities/user/api/userApi"
import { useEffect, useState } from "react"
import { LayoutWrapper } from "@/layouts/components/LayoutWrapper/LayoutWrapper"

const MainLayout = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [refresh] = useRefreshMutation()

  useEffect(() => {
    const handleRefresh = async () => {
      try {
        if (!isAuthenticated) {
          const res = await refresh().unwrap()
          if (res?.access_token) {
            console.log("Refresh successful")
          } else {
            throw new Error("No access token")
          }
        }
      } catch (err) {
        console.error("Failed to refresh token", err)
      } finally {
        setIsLoading(false)
      }
    }

    handleRefresh()
  }, [isAuthenticated, refresh, navigate])

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
