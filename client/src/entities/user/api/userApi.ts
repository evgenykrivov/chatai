import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { API_URL } from "@/app/network"
import { EApiRoute } from "@/routes/constants"
import {
  ILoginRequestApi,
  ILoginResponseApi,
  IRefreshResponseApi,
  IRegisterRequestApi,
  IRegisterResponseApi,
} from "@/entities/user/api/typesApi"
import { RootState } from "@/app/store"

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken

      if (token) {
        headers.set("authorization", `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<ILoginResponseApi, ILoginRequestApi>({
      query: (body) => ({
        url: EApiRoute.login,
        method: "POST",
        body,
        credentials: "include",
      }),
    }),
    register: builder.mutation<IRegisterResponseApi, IRegisterRequestApi>({
      query: (body) => ({
        url: EApiRoute.register,
        method: "POST",
        body,
        credentials: "include",
      }),
    }),
    logout: builder.mutation<null, void>({
      query: () => ({
        url: EApiRoute.logout,
        method: "POST",
        credentials: "include",
      }),
    }),
    refresh: builder.mutation<IRefreshResponseApi, void>({
      query: () => ({
        url: EApiRoute.refresh,
        method: "POST",
        credentials: "include",
      }),
    }),
  }),
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useRefreshMutation,
} = userApi
