import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'api/store';

export const postsSelector = (state: RootState) => state.posts.posts;

export const favoritesPostsSelector = createSelector(
  [postsSelector],
  (posts) => posts.filter(post => post.isFavorite) // Возвращаем только избранные посты
);

export const allPopularPostsSelector = createSelector(
  [postsSelector],
  (posts) => {
    console.log('Все посты:', posts); // Лог всех постов для отладки
    const popularPosts = posts.filter(post => {
      console.log(`Пост: ${post.title}, Лайки: ${post.like}, Тип: ${typeof post.like}`);
      return post.like >= 10;
    });
    console.log('Популярные посты:', popularPosts); // Лог популярных постов
    return popularPosts;
  }
);

export const postByIdSelector = (postId: number) => createSelector(
  [postsSelector],
  (posts) => posts.find(post => post.id === postId)
);

export const getPostCountLikeSelector = (postId: number) => createSelector(
  [postsSelector],
  (posts) => posts.find(post => post.id === postId)?.like ?? 0,
);      