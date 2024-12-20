import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../store/tasksSlice";
import ErrorModal from "./modals/ErrorModal";
import { Task } from "../interface/types";

const TaskForm: React.FC = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !description) {
      setShowErrorModal(true);
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
    };

    dispatch(addTask(newTask));
    setTitle("");
    setDescription("");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="header">
        <div className="text_container">
          <input
            type="text"
            className={`input title ${!title ? "error" : ""}`}
            placeholder="Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            className={`input description ${!description ? "error" : ""}`}
            placeholder="Description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit" className="add_button">
          +
        </button>
      </form>
      {showErrorModal && (
        <ErrorModal
          message="Заполните оба поля!"
          onConfirm={() => setShowErrorModal(false)}
        />
      )}
    </>
  );
};

export default TaskForm;
