import { createApi } from '@reduxjs/toolkit/query/react'
import { rtkBaseQuery } from "api/baseApi";

export interface GetMeResponse {
  username: string,
  id: number
  email: string,
  avatarUrl?: string
}

export const userApi = createApi({
  reducerPath: 'user',
  baseQuery: rtkBaseQuery,
  endpoints: (builder) => ({
    getMe: builder.query<GetMeResponse, void>({
      query: () => ({
        url: `auth/users/me/`,
        method: 'GET',
      })
    })
  })
})

export const { useLazyGetMeQuery, useGetMeQuery } = userApi;
