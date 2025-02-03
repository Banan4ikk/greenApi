import React, { useState } from "react";
import { Modal } from "components";
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
    <Modal isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <h2>Новый чат</h2>
      <input
        type="text"
        placeholder="Введите номер телефона"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
    </Modal>
  );
};

export default NewChatModal;
