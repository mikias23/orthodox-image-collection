import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import imageReducer from '../features/upload/imageSlice'

export const store = configureStore({
  reducer: {
   auth:authReducer,
   image:imageReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
