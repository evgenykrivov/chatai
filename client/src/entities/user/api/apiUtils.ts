import { API_URL } from "@/app/network"

export const addMessageAPI = async (
  chatId: string,
  message: { content: string; sender: string },
) => {
  const response = await fetch(`${API_URL}/chats/${chatId}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: JSON.stringify(message),
  })

  if (!response.ok) {
    throw new Error("Failed to add message")
  }

  return response.json()
}

export const fetchBotReplyAPI = async (
  userInput: string,
): Promise<string | null> => {
  try {
    const response = await fetch("https://api.aimlapi.com/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer cf3c7438b1bd4925851ab0b1cc41f8e1",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [{ role: "user", content: userInput }],
        max_tokens: 256,
        stream: false,
      }),
    })

    const data = await response.json()
    return data?.choices?.[0]?.message?.content || null
  } catch (err) {
    console.error("Failed to fetch bot reply:", err)
    return null
  }
}
