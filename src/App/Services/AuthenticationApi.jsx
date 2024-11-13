import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const AuthApi = createApi({
  reducerPath: 'Auth',  
  baseQuery: fetchBaseQuery({ baseUrl: 'https://bandiwala-backend.onrender.com/api/vendor/' }),
  endpoints: (build) => ({
    signUp: build.mutation({
      query: (body) => ({
        url: `signup`,
        method: 'POST',
        body,
      })
    }),
    otpVerify: build.mutation({
      query: (body) => ({
        url: `verify-otp`,
        method: 'POST',
        body,
        mode:"cors"
      })
    }),
    signIn: build.mutation({
      query: (body) => ({
        url: `login`,
        method: 'POST',
        body,
        mode:"cors"
      })
    }),
    requestPasswordReset: build.mutation({
      query: (body) => ({
        url: `request-password-reset`,
        method: 'POST',
        body,
        mode:"cors"
      })
    }),
    verifyPasswordReset: build.mutation({
      query: (body) => ({
        url: `verify-password-reset`,
        method: 'POST',
        body,
        mode:"cors"
      })
    }),
    passwordReset: build.mutation({
      query: (body) => ({
        url: `reset-password`,
        method: 'POST',
        body,
        mode:"cors"
      })
    }),
    updateProfile: build.mutation({
      query: ({formData,token}) => ({
        url: `update`,
        method: 'POST',
        body:formData,
        headers: { 'Authorization': `Bearer ${token}` },
        mode:"cors"
      })
    }),
    
  }),
})

// Auto-generated hooks
export const { 
  useSignUpMutation,
  useOtpVerifyMutation,
  useSignInMutation,
  useRequestPasswordResetMutation,
  useVerifyPasswordResetMutation,
  usePasswordResetMutation,
  useUpdateProfileMutation

} = AuthApi

