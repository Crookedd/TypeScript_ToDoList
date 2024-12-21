import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Task as TaskType } from "../interface/types";
import ButtonContainer from "./ButtonContainer";
import EditTaskModal from "./modals/EditTaskModal";
import ShareModal from "./modals/ShareModal";
import { useDispatch } from "react-redux";
import { updateTask } from "../store/tasksSlice";

interface TaskProps {
  task: TaskType;
  onDelete: (id: string) => void;
  onUpdate: (updatedTask: TaskType) => void;
  index: number;
  moveTask: (sourceIndex: number, destinationIndex: number) => void;
}

const Task: React.FC<TaskProps> = ({ task, onDelete, onUpdate, index, moveTask }) => {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isShareModalOpen, setShareModalOpen] = useState(false);

  // Перетаскивание задачи
  const [{ isDragging }, dragRef] = useDrag({
    type: "TASK",
    item: { id: task.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: "TASK",
    hover: (item: { id: string; index: number }) => {
      if (item.index !== index) {
        moveTask(item.index, index);
        item.index = index;
      }
    },
  });

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleDelete = () => {
    onDelete(task.id);
  };

  const handleEdit = (updatedTask: TaskType) => {
    dispatch(updateTask(updatedTask));
    setEditModalOpen(false);
  };

  return (
    <div
      ref={(node) => dragRef(dropRef(node))}
      className={`task ${isHovered ? "expanded" : ""} ${isDragging ? "dragging" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="text-container">
        <div className="title">{task.title}</div>
        <div className="about">{task.description}</div>
      </div>
      <button className="delete_button" onClick={handleDelete}>
        &times;
      </button>
      {isHovered && (
        <ButtonContainer
          task={task}
          isVisible={isHovered}
          onEdit={() => setEditModalOpen(true)}
          onShare={() => setShareModalOpen(true)}
        />
      )}
      {isEditModalOpen && (
        <EditTaskModal
          task={task}
          onSave={handleEdit}
          onCancel={() => setEditModalOpen(false)}
        />
      )}
      {isShareModalOpen && (
        <ShareModal task={task} onClose={() => setShareModalOpen(false)} />
      )}
    </div>
  );
};

export default Task;

