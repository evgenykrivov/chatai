export interface MessageTypesApi {
  id: string
  content: string
  sender: "bot" | "user"
  timestamp?: string
  chatId?: string
  isTemporary?: boolean
  isError?: boolean
}

export interface Chat {
  id: string
  name: string
  avatar: string
  lastMessage: string
  timestamp: string
  userId: number
  messages: MessageTypesApi[]
}
