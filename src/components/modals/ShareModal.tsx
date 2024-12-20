import React, { useState } from "react";
import CopyImg from "/src/assets/images/copy.svg";
import VKImg from "/src/assets/images/vk.svg";
import TelegramImg from "/src/assets/images/telegram.svg";
import WhatsAppImg from "/src/assets/images/whats.svg";
import ErrorModal from "./ErrorModal";
import { Task } from "../../interface/types";

interface ShareModalProps {
  task: Task;
  onClose: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ task, onClose }) => {
  const [showErrorModal, setShowErrorModal] = useState(false);

  const shareLinks = [
    {
      name: "Копировать",
      image: CopyImg,
      onClick: () => copyTaskToClipboard(task),
    },
    {
      name: "VK",
      image: VKImg,
      onClick: () => shareOnSocialMedia(task, "https://vk.com/share.php?url="),
    },
    {
      name: "Telegram",
      image: TelegramImg,
      onClick: () => shareOnSocialMedia(task, "https://t.me/share/url?url="),
    },
    {
      name: "WhatsApp",
      image: WhatsAppImg,
      onClick: () => shareOnSocialMedia(task, "https://wa.me/?text="),
    },
  ];

  const shareOnSocialMedia = (task: Task, baseUrl: string) => {
    const url = encodeURIComponent(
      `Задача: ${task.title}\nОписание: ${task.description}`
    );
    window.open(`${baseUrl}${url}`, "_blank");
  };

  const copyTaskToClipboard = (task: Task) => {
    const taskText = `Задача: ${task.title}\nОписание: ${task.description}`;
    navigator.clipboard
      .writeText(taskText)
      .then(() => {
        setShowErrorModal(true);
      })
      .catch((err) => {
        console.error("Ошибка при копировании: ", err);
        setShowErrorModal(true);
      });
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  return (
    <>
      <div className="modal" onClick={onClose}>
        <div
          className="edit_modal_content"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="share_buttons">
            {shareLinks.map((link, index) => (
              <button
                key={index}
                className="share_button"
                onClick={link.onClick}
              >
                <img src={link.image} alt={link.name} />
              </button>
            ))}
          </div>
        </div>
      </div>
      {showErrorModal && (
        <ErrorModal
          message="Задача скопирована в буфер обмена."
          onConfirm={handleCloseErrorModal}
        />
      )}
    </>
  );
};

export default ShareModal;

