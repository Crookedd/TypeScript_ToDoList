import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tasksSlice.ts";

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export default store;

