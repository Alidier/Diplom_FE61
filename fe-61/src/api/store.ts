import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './reducers/counter';
import postsReducer from './reducers/posts'
import { userApi } from 'api/endpoints/user';
import { blogApi } from './endpoints/blog';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postsReducer,
    user: userApi.reducer,
    blog: blogApi.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({ thunk: true, composeWithDevTools: true }).concat(
      userApi.middleware,
      blogApi.middleware
    )
})

export type RootState = ReturnType<typeof store.getState>;

export default store;