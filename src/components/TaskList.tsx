import React from "react";
import { useDispatch } from "react-redux";
import { reorderTasks } from "../store/tasksSlice";
import Task from "./Task";
import { Task as TaskType } from "../interface/types";

interface TaskListProps {
  tasks: TaskType[];
  deleteTask: (id: string) => void;
  updateTask: (updatedTask: TaskType) => void;
  maxPinnedTasks: number; 
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  deleteTask,
  updateTask,
  maxPinnedTasks
}) => {
  const dispatch = useDispatch();

  const moveTask = (sourceIndex: number, destinationIndex: number) => {
    dispatch(reorderTasks({ sourceIndex, destinationIndex }));
  };

  const pinnedTasks = tasks.filter((task) => task.pinned);
  const unpinnedTasks = tasks.filter((task) => !task.pinned);

  return (
    <div className="task_section">
      {tasks.length === 0 && <hr className="top_line" />}
      {tasks.length === 0 ? (
        <p className="no_tasks">No tasks</p>
      ) : (
        <>
          {pinnedTasks.length > 0 && (
            <>
              {pinnedTasks.map((task, index) => (
                <Task
                  key={task.id}
                  task={task}
                  onDelete={deleteTask}
                  onUpdate={updateTask}
                  index={index}
                  moveTask={moveTask}
                  pinnedTasks={pinnedTasks} 
                  maxPinnedTasks={maxPinnedTasks} 
                />
              ))}
            </>
          )}

          {pinnedTasks.length > 0 && unpinnedTasks.length > 0 && <hr className="top_line" />}

          {unpinnedTasks.length > 0 && (
            <>
              {unpinnedTasks.map((task, index) => (
                <Task
                  key={task.id}
                  task={task}
                  onDelete={deleteTask}
                  onUpdate={updateTask}
                  index={index}
                  moveTask={moveTask}
                  pinnedTasks={pinnedTasks} 
                  maxPinnedTasks={maxPinnedTasks} 
                />
              ))}
            </>
          )}
        </>
      )}
      {tasks.length === 0 && <hr className="top_line" />}
    </div>
  );
};

export default TaskList;






