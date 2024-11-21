import { useAppSelector } from "@/app/hooks"

export const useAuth = (): boolean => {
  const { accessToken } = useAppSelector((state) => state.auth)

  console.log("123", accessToken)
  return !!accessToken
}
