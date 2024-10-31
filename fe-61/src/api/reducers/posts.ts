import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post as IPost } from 'api/endpoints/blog';

interface PostsState {
  posts: IPost[];
  favoritesPosts: IPost[];
  currentPost: IPost | null;
  isShowModal: boolean;
}

const initialState: PostsState = {
  posts: [],
  favoritesPosts: [],
  currentPost: null,
  isShowModal: false,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    loadPosts: (state, action: PayloadAction<IPost[]>) => {
      state.posts = action.payload;
      state.favoritesPosts = action.payload.filter(post => post.isFavorite);
    },

    doLike: (state, action: PayloadAction<number>) => {
      const post = state.posts.find(({ id }) => id === action.payload);
      if (post) {
        post.like += 1;
      }
    },

    doDislike: (state, action: PayloadAction<number>) => {
      const post = state.posts.find(({ id }) => id === action.payload);
      if (post) {
        post.dislike += 1;
      }
    },

    updateBookmark: (state, action: PayloadAction<number>) => {
      const postId = action.payload;
      const post = state.posts.find(post => post.id === postId);
      if (post) {
        post.isFavorite = !post.isFavorite; // Переключаем состояние закладки
      }
    },
    showCurrentPost: (state, action: PayloadAction<IPost>) => {
      state.isShowModal = true;
      state.currentPost = action.payload;
    },

    showModal: (state) => {
      state.isShowModal = true;
    },

    hideModal: (state) => {
      state.isShowModal = false;
    },

    toggleModal: (state) => {
      state.isShowModal = !state.isShowModal;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  loadPosts,
  doLike,
  doDislike,
  updateBookmark,
  showModal,
  hideModal,
  showCurrentPost,
  toggleModal,
} = postsSlice.actions;

export default postsSlice.reducer;
