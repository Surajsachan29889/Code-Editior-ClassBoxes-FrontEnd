import { token } from '@/constants/constants';
import { getItem } from '@/lib/localStorage';
import { GetUserResponse, LoginResponse, SignupResponse } from '@/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: 'apis',
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/`,
            prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json');
            headers.set('authorization', getItem(token) || '');
            return headers;
        },
    }),
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, { email: string, password: string }>({
            query: ({ email, password }) => ({
            url: "auth/login",
            method: 'POST',
            body: { email, password },
        }),
        }),
        signup: builder.mutation<SignupResponse, { email: string, password: string, name: string }>({
            query: ({ email, password, name }) => ({
            url: "auth/signup",
            method: 'POST',
            body: { email, password, name },
        }),
        }),
        resetPassword: builder.mutation<string, { email: string }>({
            query: ({ email }) => ({
            url: "auth/resetpassword",
            method: 'POST',
            body: { email },
        }),
        }),
        codeExecute: builder.mutation<{ output: string, executionTime: string, memoryUsage: string, message: string }, { code: string, language: string, type: "sumission" | "execution" }>({
            query: ({ code, language, type }) => ({
            url: "code/execute",
            method: 'POST',
            body: { code, language, type },
        }),
        }),
        getUser: builder.mutation<GetUserResponse, string>({
            query: (token) => ({
            url: "auth/user",
            method: 'POST',
            body: token,
        }),
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation, useCodeExecuteMutation, useSignupMutation, useResetPasswordMutation, useGetUserMutation } = api