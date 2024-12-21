import { Task } from "../interface/types";

export const loadTasks = (): Task[] => {
  return JSON.parse(localStorage.getItem("tasks") || "[]");
};

export const saveTasks = (tasks: Task[]): void => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};


