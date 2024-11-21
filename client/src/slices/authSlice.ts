import { createSlice } from "@reduxjs/toolkit"
import { userApi } from "@/entities/user/api/userApi"

interface IAuthState {
  accessToken: string | null
}

const initialState: IAuthState = {
  accessToken: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(userApi.endpoints?.login.matchFulfilled, (state, action) => {
        state.accessToken = action.payload.access_token
      })
      .addMatcher(
        userApi.endpoints?.register.matchFulfilled,
        (state, action) => {
          state.accessToken = action.payload.access_token
        },
      )
      .addMatcher(
        userApi.endpoints?.refresh.matchFulfilled,
        (state, action) => {
          state.accessToken = action.payload.access_token
        },
      )
      .addMatcher(userApi.endpoints?.logout.matchFulfilled, (state) => {
        state.accessToken = null
      })
      .addMatcher(userApi.endpoints?.refresh.matchRejected, (state) => {
        state.accessToken = null
      })
  },
})

export const authReducer = authSlice.reducer
