import React from "react";
import ShareImg from "/src/assets/images/share.svg";
import EditImg from "/src/assets/images/edit.svg";
import InfoImg from "/src/assets/images/inf.svg";
import { Task } from "../interface/types";

interface ButtonContainerProps {
  task: Task;
  isVisible: boolean;
  onEdit: () => void;
  onShare: () => void;
}

const ButtonContainer: React.FC<ButtonContainerProps> = ({
  //task,
  isVisible,
  onEdit,
  onShare,
}) => {
  return (
    <div className="button_container">
      {isVisible && (
        <>
          <button className="action_button" onClick={onShare}>
            <img src={ShareImg} alt="Share" />
          </button>
          <button className="action_button" onClick={onEdit}>
            <img src={EditImg} alt="Edit" />
          </button>
          <button className="action_button">
            <img src={InfoImg} alt="Info" />
          </button>
        </>
      )}
    </div>
  );
};

export default ButtonContainer;

