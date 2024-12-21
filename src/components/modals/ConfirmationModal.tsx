import React from "react";

type ConfirmationModalProps = {
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="modal">
      <div className="modal_content">
        <h4>Delete this task?</h4>
        <div className="modal_buttons">
          <button className="confirm_button" onClick={onConfirm}>
            Yes
          </button>
          <button className="cancel_button" onClick={onCancel}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
