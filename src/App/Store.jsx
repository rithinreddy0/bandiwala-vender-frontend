import { configureStore } from '@reduxjs/toolkit'
import { AuthApi } from './Services/AuthenticationApi'
import { MenuApi } from './Services/MenuApi'
import {OrdersApi } from './Services/OrdersApi'
import { setupListeners } from '@reduxjs/toolkit/query'

export const Store = configureStore({
  reducer: {
    [AuthApi.reducerPath]: AuthApi.reducer,
    [MenuApi.reducerPath]: MenuApi.reducer,
    [OrdersApi.reducerPath]: OrdersApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(AuthApi.middleware)
      .concat(MenuApi.middleware)
      .concat(OrdersApi.middleware),
})

setupListeners(Store.dispatch)
