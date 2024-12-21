import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../interface/types";
import { loadTasks, saveTasks } from "../localStorage";

interface TasksState {
  tasks: Task[];
  pinnedTasks: string[]; 
}

const initialState: TasksState = {
  tasks: loadTasks(),
  pinnedTasks: [],
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
      state.pinnedTasks = state.pinnedTasks.filter((id) => id !== action.payload);
      saveTasks(state.tasks);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
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
    togglePinTask: (state, action: PayloadAction<string>) => {
      const taskId = action.payload;
      const isPinned = state.pinnedTasks.includes(taskId);

      if (isPinned) {
        state.pinnedTasks = state.pinnedTasks.filter((id) => id !== taskId); 
      } else if (state.pinnedTasks.length < 3) {
        state.pinnedTasks.push(taskId); 
      }
      saveTasks(state.tasks);
    },
  },
});

export const { addTask, deleteTask, updateTask, reorderTasks, togglePinTask } = tasksSlice.actions;
export default tasksSlice.reducer;



