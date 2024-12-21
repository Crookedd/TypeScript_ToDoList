import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tasksSlice";

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export default store;

