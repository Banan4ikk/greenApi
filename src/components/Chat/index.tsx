import React from "react";
import Message from "../Message";
import "./chat.scss";

type ChatProps = {
  user: string;
};

const Chat: React.FC<ChatProps> = ({ user }) => {
  return (
    <div className="chat">
      <div className="chat-header">{user}</div>
      <div className="messages">
        <Message text="Привет! Как дела?" sender="me" />
        <Message text="Привет! Все хорошо, спасибо!" sender="other" />
      </div>
      <div className="send-container">
        <input type="text" placeholder="Введите сообщение..." />
        <button>Отправить</button>
      </div>
    </div>
  );
};

export default Chat;
