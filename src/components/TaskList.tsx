import React from "react";
import Task from "./Task";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DroppableProvided,
  DraggableProvided,
} from "react-beautiful-dnd";

import { useDispatch } from "react-redux";
import { reorderTasks } from "../store/tasksSlice";
import { Task as TaskType } from "../interface/types";

interface TaskListProps {
  tasks: TaskType[];
  deleteTask: (id: string) => void;
}



const TaskList: React.FC<TaskListProps> = ({ tasks, deleteTask }) => {
  const dispatch = useDispatch();

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    dispatch(
      reorderTasks({
        sourceIndex: result.source.index,
        destinationIndex: result.destination.index,
      })
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided: import("react-beautiful-dnd").DroppableProvided) => (
          <div
            className="task_section"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {tasks.length === 0 && <hr className="top_line" />}
            {tasks.length === 0 ? (
              <p className="no_tasks">No tasks</p>
            ) : (
              tasks.map((task, index) => (
                <Draggable  key={task.id} draggableId={task.id} index={index}>
                  {(provided: import("react-beautiful-dnd").DraggableProvided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Task task={task} onDelete={deleteTask} />
                    </div>
                  )}
                </Draggable>
              ))
            )}
            {provided.placeholder as React.ReactNode}
            {tasks.length === 0 && <hr className="top_line" />}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TaskList;


