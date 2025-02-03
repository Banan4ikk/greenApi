import React, { useState } from "react";
import "./newChat.scss";

interface NewChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (phoneNumber: string) => void;
}

const NewChatModal: React.FC<NewChatModalProps> = ({
  isOpen,
  onClose,
  onSend,
}) => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = () => {
    if (phoneNumber.trim()) {
      onSend(phoneNumber);
      setPhoneNumber("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Новый чат</h2>
        <input
          type="text"
          placeholder="Введите номер телефона"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <div className="modal-actions">
          <button onClick={onClose}>Отмена</button>
          <button onClick={handleSubmit}>Подтвердить</button>
        </div>
      </div>
    </div>
  );
};

export default NewChatModal;
