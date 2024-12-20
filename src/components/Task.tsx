import React, { useState } from "react";
import { useDispatch } from "react-redux";
import ButtonContainer from "./ButtonContainer";
import EditTaskModal from "./modals/EditTaskModal";
import ShareModal from "./modals/ShareModal";
import { deleteTask, updateTask } from "../store/tasksSlice";
import { Task as TaskType } from "../interface/types";

interface TaskProps {
  task: TaskType;
  onDelete: (id: string) => void;
}

const Task: React.FC<TaskProps> = ({ task, onDelete }) => {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isShareModalOpen, setShareModalOpen] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const handleDelete = () => onDelete(task.id);

  const handleEdit = (updatedTask: TaskType) => {
    dispatch(updateTask(updatedTask));
    setEditModalOpen(false);
  };

  return (
    <div
      className={`task ${isHovered ? "expanded" : ""}`}
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

