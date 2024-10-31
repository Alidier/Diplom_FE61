import { BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { getAccessToken } from "./auth";

export const BASE_API_URL = 'https://studapi.teachmeskills.by'

const baseQuery = fetchBaseQuery({ 
  baseUrl: BASE_API_URL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('access');

    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }

    return headers;
  }
})

export const rtkBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
await getAccessToken();

const result = await baseQuery(args, api, extraOptions);

if (result.error && result.error.status === 401) {
  // await logOut();
}

if (result.error?.data) {
  // todo make global snackbar
}

return result;
};    