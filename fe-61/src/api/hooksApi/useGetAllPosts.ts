import { PostParams, useGetAllPostsQuery } from "api/endpoints/blog"
import { useMemo } from "react"

const removeEmpty = (params: PostParams) => {
  return Object.entries(params).reduce((acc: PostParams, [key, value]) => {
    if (value !== '') {
      acc[key as keyof PostParams] = value
    }

    return acc;
  }, {})

} 

export const useGetAllPosts = (params: PostParams) => {
  const { data, isLoading } = useGetAllPostsQuery({
    // limit: 100,
    // offset: 0,
    // search: search,
    // ordering: ordering,
    ...removeEmpty(params),
    // ...params,
  })

  const posts = useMemo(() => {
    if (!data) {
      return [];
    }

    return data.results ?? []
  }, [data]);

  return {
    posts,
    count: data?.count ?? 0,
    isLoading
  }
}