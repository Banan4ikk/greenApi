import React, { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { Loader, Message } from "components";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchMessages } from "../../store/chatSlice/thunks";
import { getChatId } from "../../utils";
import { addMessage } from "../../store/messagesSlice";
import { ReturnMessage } from "../../store/messagesSlice/types";
import apiClient from "../../api/apiClient";
import "./chat.scss";

type ChatProps = {
  user: string;
};

const Chat: React.FC<ChatProps> = ({ user }) => {
  const dispatch = useAppDispatch();
  const { activeChatId } = useAppSelector((state) => state.chats);
  const { messages, meta } = useAppSelector((state) => state.messages);
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

    if (response.status === 200 && activeChatId) {
      dispatch(
        addMessage({
          chatId: activeChatId,
          text: message,
          messageId: response.data.messageId,
          activeChatId,
        })
      );
    }
  };

  useEffect(() => {
    if (activeChatId) dispatch(fetchMessages(activeChatId));
  }, [activeChatId]);

  if (!activeChatId) return null;

  return (
    <div className="chat">
      <div className="chat-header">{user}</div>
      {meta.loading ? (
        <Loader />
      ) : (
        <div className="messages">
          {messages &&
            messages.map((item) => (
              <Message
                text={item.extendedTextMessage?.text}
                sender={item.type}
                key={item.idMessage}
              />
            ))}
        </div>
      )}
      {!messages ||
        (!messages.length && !meta.loading && (
          <div className="empty-messages">История сообщений пуста</div>
        ))}
      <div className="send-container">
        <input
          type="text"
          placeholder="Введите сообщение..."
          value={message}
          onChange={handleMessageChange}
        />
        <button onClick={onSend} type="button">
          Отправить
        </button>
      </div>
    </div>
  );
};

export default Chat;
