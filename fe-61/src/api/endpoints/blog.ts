import { createApi } from '@reduxjs/toolkit/query/react'
import { rtkBaseQuery } from "api/baseApi";

export interface Post {
  id: number;
  image: string;
  text: string;
  date: string;
  lessonNum: number;
  title: string;
  author: number;
  like: number;
  dislike: number;
  isFavorite: boolean;
}

export interface PostParams {
  author__course_group?: number;
  limit?: number;
  offset?: number;
  ordering?: string;
  search?: string;
}

export interface GetAllPostsResponse {
  count: number;      // Общее количество постов
  next: string | null; // Ссылка на следующую страницу (если есть)
  previous: string | null; // Ссылка на предыдущую страницу (если есть)
  results: Post[];     // Массив постов
}

export interface CreatePostBody {
  image: string,
  text:string,
  lesson_num: number,
  title: string,
  description: string
}

export const blogApi = createApi({
  reducerPath: 'blog',
  baseQuery: rtkBaseQuery,
  tagTypes: ['all Posts'],
  endpoints: (builder) => ({
    getAllPosts: builder.query<GetAllPostsResponse, PostParams>({
      providesTags: ['all Posts'],
      query: (params) => ({
        url: `blog/posts`,
        method: 'GET',
        params: {
          ...params
        }
      })
    }),
    createPost: builder.mutation<Post,FormData>({
      query: (body) => ({
        url: `blog/posts/`,
        method: 'POST',
        // headers: {
        //   'Content-Type': 'multipart/form-data;'
        // },
        body,
      })
    })
  })
})

export const { useGetAllPostsQuery, useCreatePostMutation } = blogApi;
