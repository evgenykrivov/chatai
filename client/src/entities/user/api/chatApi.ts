import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { API_URL } from "@/app/network"
import { RootState } from "@/app/store"

export const chatApi = createApi({
  reducerPath: "chatApi",
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
  tagTypes: ["Chat", "Message"], // Добавляем теги
  endpoints: (builder) => ({
    getChats: builder.query({
      query: () => ({
        url: "/chats",
        method: "GET",
        credentials: "include",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }: { id: string }) => ({
                type: "Chat" as const,
                id,
              })),
              { type: "Chat", id: "LIST" },
            ]
          : [{ type: "Chat", id: "LIST" }],
    }),
    getChatById: builder.query({
      query: (id: string) => ({
        url: `/chats/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: (result, error, id) => [{ type: "Chat", id }],
    }),
    createChat: builder.mutation({
      query: (chatData) => ({
        url: "/chats",
        method: "POST",
        body: chatData,
        credentials: "include",
      }),
      invalidatesTags: [{ type: "Chat", id: "LIST" }], // Обновляем список чатов
    }),
    addMessage: builder.mutation({
      query: ({ chatId, message }) => ({
        url: `/chats/${chatId}/messages`,
        method: "POST",
        body: message,
        credentials: "include",
      }),
      invalidatesTags: (result, error, { chatId }) => [
        { type: "Chat", id: chatId }, // Обновляем сообщения для конкретного чата
      ],
    }),
  }),
})

export const {
  useGetChatsQuery,
  useGetChatByIdQuery,
  useCreateChatMutation,
  useAddMessageMutation,
} = chatApi
