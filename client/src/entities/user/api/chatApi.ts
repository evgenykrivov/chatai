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
  tagTypes: ["Chat", "Message"],
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
      invalidatesTags: [{ type: "Chat", id: "LIST" }],
    }),
    addMessage: builder.mutation({
      query: ({ chatId, message }) => ({
        url: `/chats/${chatId}/messages`,
        method: "POST",
        body: message,
        credentials: "include",
      }),
      invalidatesTags: (result, error, { chatId }) => [
        { type: "Chat", id: chatId },
      ],
    }),

    deleteChat: builder.mutation<void, string>({
      query: (id) => ({
        url: `/chats/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: [{ type: "Chat", id: "LIST" }],
    }),
  }),
})

export const {
  useGetChatsQuery,
  useGetChatByIdQuery,
  useCreateChatMutation,
  useAddMessageMutation,
  useDeleteChatMutation,
} = chatApi
