import {
  createBrowserRouter,
  Navigate,
  RouteObject,
  RouterProvider,
} from "react-router-dom"
import { ERoute } from "./constants"
import PrivateLayout from "@/layouts/PrivateLayout"
import MainLayout from "@/layouts/MainLayout"
import ChatListPage from "@/pages/ChatListPage/ChatListPage"
import ChatPage from "@/pages/ChatPage/ChatPage"
import LoginPage from "@/pages/LoginPage/LoginPage"
import RegisterPage from "@/pages/RegisterPage/RegisterPage"

const Routes = () => {
  const routesForAuthenticatedOnly: RouteObject[] = [
    {
      element: <PrivateLayout />,
      children: [
        {
          path: ERoute.ChatListPage,
          element: <ChatListPage />,
        },
        {
          path: `${ERoute.ChatPage}/:id`,
          element: <ChatPage />,
        },
        {
          path: "*",
          element: <Navigate to={ERoute.ChatListPage} />,
        },
      ],
    },
  ]

  const routesForPublic: RouteObject[] = [
    {
      element: <MainLayout />,
      children: [
        {
          path: ERoute.LoginPage,
          element: <LoginPage />,
        },
        {
          path: ERoute.RegisterPage,
          element: <RegisterPage />,
        },
      ],
    },
  ]

  const router = createBrowserRouter([
    ...routesForPublic,
    ...routesForAuthenticatedOnly,
  ])

  return <RouterProvider router={router} />
}

export default Routes
