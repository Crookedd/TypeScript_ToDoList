import React from "react";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import { reorderTasks } from "../store/tasksSlice";
import Task from "./Task";
import { Task as TaskType } from "../interface/types";

interface TaskListProps {
  tasks: TaskType[];
  deleteTask: (id: string) => void;
  updateTask: (updatedTask: TaskType) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, deleteTask, updateTask }) => {
  const dispatch = useDispatch();

  const moveTask = (sourceIndex: number, destinationIndex: number) => {
    dispatch(reorderTasks({ sourceIndex, destinationIndex }));
  };

  return (
    <div className="task_section">
      {tasks.length === 0 && <hr className="top_line" />}
      {tasks.length === 0 ? (
        <p className="no_tasks">No tasks</p>
      ) : (
        tasks.map((task, index) => (
          <Task
            key={task.id}
            task={task}
            onDelete={deleteTask}
            onUpdate={updateTask}
            index={index}
            moveTask={moveTask}
          />
        ))
      )}
      {tasks.length === 0 && <hr className="top_line" />}
    </div>
  );
};

export default TaskList;




