import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom"
import { ERoute } from "./constants"
import PrivateLayout from "@/layouts/PrivateLayout"
import MainLayout from "@/layouts/MainLayout"
import ChatListPage from "@/pages/ChatListPage/ChatListPage"
import ChatPage from "@/pages/ChatPage/ChatPage"
import NotFoundPage from "@/pages/NotFoundPage/NotFoundPage"
import LoginPage from "@/pages/LoginPage/LoginPage"
import RegisterPage from "@/pages/RegisterPage/RegisterPage"

const Routes = () => {
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
        {
          path: "*",
          element: <NotFoundPage />,
        },
      ],
    },
  ]

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
