import React, { useState } from "react";
import ErrorModal from "./ErrorModal";
import { Task } from "../../interface/types";

interface EditTaskModalProps {
  task: Task;
  onSave: (updatedTask: Task) => void;
  onCancel: () => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({ task, onSave, onCancel }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) {
      setShowErrorModal(true);
      return;
    }
    onSave({ ...task, title, description });
    onCancel();
  };

  const handleCloseErrorModal = () => setShowErrorModal(false);

  return (
    <>
      <div className="modal">
        <div className="edit_modal_content">
          <div className="text_container">
            <input
              type="text"
              className="input mini_input mb-12"
              placeholder="Mini input..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="textarea max_input"
              rows={15}
              placeholder="Max input..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="edit_modal_buttons">
            <button className="cancel_button" onClick={onCancel}>
              Cancel
            </button>
            <button className="save_button" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
      {showErrorModal && (
        <ErrorModal
          message="Заполните оба поля!"
          onConfirm={handleCloseErrorModal}
        />
      )}
    </>
  );
};

export default EditTaskModal;
