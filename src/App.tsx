// App.tsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import ConfirmationModal from "./components/modals/ConfirmationModal";
import { addTask, deleteTask, updateTask } from "./store/tasksSlice";
import { RootState, Task } from "./interface/types";
import "./assets/styles/main.scss";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const [isModalOpen, setModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  const handleAddTask = (task: Task) => {
    dispatch(addTask(task));
  };

  const handleDeleteTask = (id: string) => {
    setTaskToDelete(id);
    setModalOpen(true);
  };

  const confirmDeleteTask = () => {
    if (taskToDelete) {
      dispatch(deleteTask(taskToDelete));
    }
    setModalOpen(false);
  };

  const cancelDeleteTask = () => {
    setModalOpen(false);
  };

  const handleUpdateTask = (updatedTask: Task) => {
    dispatch(updateTask(updatedTask));
  };

  return (
    <div className="container">
      <TaskForm addTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        deleteTask={handleDeleteTask}
        updateTask={handleUpdateTask}
      />
      {isModalOpen && (
        <ConfirmationModal
          onConfirm={confirmDeleteTask}
          onCancel={cancelDeleteTask}
        />
      )}
    </div>
  );
};

export default App;

