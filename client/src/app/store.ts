import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit"
import { userApi } from "@/entities/user/api/userApi"
import { authReducer } from "@/slices/authSlice"
import { chatApi } from "@/entities/user/api/chatApi"

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([userApi.middleware, chatApi.middleware]),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
