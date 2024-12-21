import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../interface/types";
import { loadTasks, saveTasks } from "../localStorage";

interface TasksState {
  tasks: Task[];
}

const initialState: TasksState = {
  tasks: loadTasks(),
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
      saveTasks(state.tasks);
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      saveTasks(state.tasks);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
        saveTasks(state.tasks);
      }
    },
    reorderTasks: (state, action: PayloadAction<{ sourceIndex: number; destinationIndex: number }>) => {
      const { sourceIndex, destinationIndex } = action.payload;
      const [movedTask] = state.tasks.splice(sourceIndex, 1);
      state.tasks.splice(destinationIndex, 0, movedTask);
      saveTasks(state.tasks);
    },
  },
});

export const { addTask, deleteTask, updateTask, reorderTasks } = tasksSlice.actions;

export default tasksSlice.reducer;


