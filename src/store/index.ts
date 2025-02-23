import { configureStore } from '@reduxjs/toolkit';
import { userProcess } from './user-process/user-process.slice';

export const store = configureStore({
  reducer: {
    USER: userProcess.reducer
  }
});
