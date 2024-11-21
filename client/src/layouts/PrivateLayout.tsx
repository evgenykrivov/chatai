import { Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "@/hooks"
import { useRefreshMutation } from "@/entities/user/api/userApi"
import { useEffect } from "react"
import { ERoute } from "@/routes/constants"
import { LayoutWrapper } from "@/layouts/components/LayoutWrapper/LayoutWrapper"
import { Header } from "@/components/Header/Header"

const PrivateLayout = () => {
  const isAuth = useAuth()
  const navigate = useNavigate()
  const [refresh] = useRefreshMutation()

  useEffect(() => {
    if (!isAuth) {
      refresh()
        .then((res) => {
          if (res.hasOwnProperty("error")) {
            navigate(ERoute.LoginPage)
          }
        })
        .catch(() => navigate(ERoute.LoginPage))
    }
  }, [isAuth, refresh, navigate])

  return (
    <LayoutWrapper>
      <Header />
      {isAuth ? <Outlet /> : <div>Loading...</div>}
    </LayoutWrapper>
  )
}

export default PrivateLayout
