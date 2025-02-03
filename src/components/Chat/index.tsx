import React, { useEffect, useState } from "react";
import "./chat.scss";
import { AxiosResponse } from "axios";
import apiClient from "../../api/apiClient";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchMessages } from "../../store/chatSlice/thunks";
import Message from "../Message";
import { getChatId } from "../../utils";
import { addMessage } from "../../store/chatSlice";
import { ReturnMessage } from "../../store/chatSlice/types";

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
      chatId: getChatId(user),
      message,
    };
    const response: AxiosResponse<ReturnMessage> = await apiClient.post(
      `/sendMessage`,
      data
    );

    if (response.status === 200) {
      setMessage("");
    }

    if (response.status === 200 && chatId) {
      dispatch(
        addMessage({
          chatId,
          text: message,
          messageId: response.data.messageId,
        })
      );
    }
  };

  useEffect(() => {
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
              text={message.extendedTextMessage?.text}
              sender={message.type}
              key={message.idMessage}
            />
          ))}
      </div>
      {!messages ||
        (!messages.length && (
          <div className="empty-messages">История сообщений пуста</div>
        ))}
      <div className="send-container">
        <input
          type="text"
          placeholder="Введите сообщение..."
          value={message}
          onChange={handleMessageChange}
        />
        <button onClick={onSend}>Отправить</button>
      </div>
    </div>
  );
};

export default Chat;
