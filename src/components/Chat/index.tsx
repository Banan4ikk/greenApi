import React, { useEffect, useState } from "react";
import "./chat.scss";
import apiClient from "../../api/apiClient";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchMessages } from "../../store/chatSlice/thunks";
import Message from "../Message";

type ChatProps = {
  user: string;
  chatId: string | null;
};

const Chat: React.FC<ChatProps> = ({ user, chatId }) => {
  const dispatch = useAppDispatch();
  const { messages } = useAppSelector((state) => state.chats);
  const [message, setMessage] = useState("");

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const onSend = async () => {
    const data = {
      chatId: `${user}@c.us`,
      message,
    };
    const response = await apiClient.post(`/sendMessage`, data);

    if (response.status === 200) {
      setMessage("");
    }
  };

  useEffect(() => {
    console.log("messages", messages, chatId);
    if (!messages && chatId) dispatch(fetchMessages(chatId));
  }, [chatId]);

  if (!chatId) return null;

  return (
    <div className="chat">
      <div className="chat-header">{user}</div>
      <div className="messages">
        {messages &&
          messages.map((message) => (
            <Message
              text={message.extendedTextMessage.text}
              sender={message.type}
              key={message.timestamp}
            />
          ))}
      </div>
      <div className="send-container">
        <input
          type="text"
          placeholder="Введите сообщение..."
          onChange={handleMessageChange}
        />
        <button onClick={onSend}>Отправить</button>
      </div>
    </div>
  );
};

export default Chat;
