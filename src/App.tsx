import React from "react";
import Task from "./Task";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DroppableProvided,
  DraggableProvided,
  DropResult,
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

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination || source.index === destination.index) {
      return; // Если перемещение не изменило порядок или было отменено
    }

    dispatch(
      reorderTasks({
        sourceIndex: source.index,
        destinationIndex: destination.index,
      })
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided: DroppableProvided) => (
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
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided: DraggableProvided) => (
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
            {provided.placeholder}
            {tasks.length === 0 && <hr className="top_line" />}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TaskList;


