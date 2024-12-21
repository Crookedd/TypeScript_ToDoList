import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Task as TaskType } from "../interface/types";
import ButtonContainer from "./ButtonContainer";
import EditTaskModal from "./modals/EditTaskModal";
import ShareModal from "./modals/ShareModal";
import { useDispatch } from "react-redux";
import { updateTask } from "../store/tasksSlice";
import ErrorModal from "./modals/ErrorModal";

interface TaskProps {
  task: TaskType;
  onDelete: (id: string) => void;
  onUpdate: (updatedTask: TaskType) => void;
  index: number;
  moveTask: (sourceIndex: number, destinationIndex: number) => void;
  pinnedTasks: TaskType[];
  maxPinnedTasks: number;
}

const Task: React.FC<TaskProps> = ({
  task,
  onDelete,
  index,
  moveTask,
  pinnedTasks,
  maxPinnedTasks,
}) => {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isShareModalOpen, setShareModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

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
        const sourceTask = pinnedTasks.find((t) => t.id === item.id);
        const targetTask = pinnedTasks.find((t) => t.id === task.id);

        if (
          (sourceTask?.pinned && targetTask?.pinned) ||
          (!sourceTask?.pinned && !targetTask?.pinned)
        ) {
          moveTask(item.index, index);
          item.index = index;
        }
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

  const handlePinToggle = () => {
    if (task.pinned) {
      dispatch(updateTask({ ...task, pinned: false }));
    } else if (pinnedTasks.length < maxPinnedTasks) {
      dispatch(updateTask({ ...task, pinned: true }));
    } else {
      setIsErrorModalOpen(true);
    }
  };

  const closeErrorModal = () => {
    setIsErrorModalOpen(false);
  };

  return (
    <div
      ref={(node) => dragRef(dropRef(node))}
      className={`task ${isHovered ? "expanded" : ""} ${task.pinned ? "pinned" : ""} ${isDragging ? "dragging" : ""}`}
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
      <button className="pin_button" onClick={handlePinToggle}>
        {task.pinned
          ? "Unpin"
          : pinnedTasks.length < maxPinnedTasks
            ? "Pin"
            : "Pin"}
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
      {isErrorModalOpen && (
        <ErrorModal
          message="Вы можете закрепить только 3 задачи."
          onConfirm={closeErrorModal}
        />
      )}
    </div>
  );
};

export default Task;
