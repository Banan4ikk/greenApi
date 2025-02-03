import React from "react";
import Message from "../Message";
import "./chat.scss";

const Chat = () => {
  return (
    <div className="chat">
      <div className="messages">
        <Message text="Привет! Как дела?" sender="me" />
        <Message text="Привет! Все хорошо, спасибо!" sender="other" />
      </div>
      <input type="text" placeholder="Введите сообщение..." />
    </div>
  );
};

export default Chat;
