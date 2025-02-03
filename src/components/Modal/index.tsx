import React, { PropsWithChildren } from "react";
import "./newChat.scss";

interface NewChatModalProps {
  isOpen: boolean;
  onClose?: () => void;
  onSubmit: () => void;
  hideClose?: boolean;
  disabled?: boolean;
}

const NewChatModal: React.FC<PropsWithChildren<NewChatModalProps>> = ({
  isOpen,
  onClose,
  onSubmit,
  children,
  hideClose,
  disabled,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
        <div className="modal-actions">
          {!hideClose && (
            <button onClick={onClose} type="button" disabled={disabled}>
              Отмена
            </button>
          )}
          <button onClick={onSubmit} type="submit">
            Подтвердить
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewChatModal;
