import { configureStore } from '@reduxjs/toolkit'
import { AuthApi } from './Services/AuthenticationApi'
import { MenuApi } from './Services/MenuApi'
import { setupListeners } from '@reduxjs/toolkit/query'

export const Store = configureStore({
  reducer: {
    [AuthApi.reducerPath]: AuthApi.reducer,
    [MenuApi.reducerPath]: MenuApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(AuthApi.middleware)
      .concat(MenuApi.middleware),
})

setupListeners(Store.dispatch)
