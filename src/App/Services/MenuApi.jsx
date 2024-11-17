import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const MenuApi = createApi({
  reducerPath: 'Menu',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://bandiwala-backend.onrender.com/api/vendor/' }),
  endpoints: (build) => ({
    addItem: build.mutation({

      query: ({ itemData, token }) => ({
        url: `additem`,
        method: 'POST',
        body: itemData, // Send item data directly
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        mode:"cors"
      }),
      

    }),

    getMenuItems: build.mutation({
      query: ({ token }) => ({
        url: `/getAllMenuItems`,
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        mode:"cors"
      }),
    
    }),
    deleteItem: build.mutation({
      query: ({ id,token }) => ({
        url: `/deleteItem`,
        method: 'POST',
        body:{id},
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        mode:"cors"
      })
    
    }),

    toggleItem: build.mutation({
      query: ({ id,token }) => ({
        url: `/toggleItem`,
        method: 'POST',
        body:{id},
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        mode:"cors"
      })
    
    }),
  }),
})

export const { useAddItemMutation,useGetMenuItemsMutation,useDeleteItemMutation,useToggleItemMutation } = MenuApi
