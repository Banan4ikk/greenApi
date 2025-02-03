import React, { useEffect, useState } from "react";
import ChatSmall from "../ChatSmall";
import Chat from "../Chat";
import "./chatMain.scss";
import NewChatModal from "../Modals/NewChat";
import { fetchChats, saveChat } from "../../store/chatSlice/thunks";
import { getChatId, getChatNameById } from "../../utils";
import { useAppDispatch, useAppSelector } from "../../store";

const ChatMain = () => {
  const dispatch = useAppDispatch();
  const { chats } = useAppSelector((store) => store.chats);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [user, setUser] = useState("");

  const handleNewChat = () => setIsVisibleModal(true);

  const onSubmitNewChat = (userPhone: string) => {
    setUser(userPhone);
    setActiveChatId(getChatId(userPhone));
    dispatch(saveChat({ name: userPhone, chatId: getChatId(userPhone) }));
  };
  const handleClickChat = (chatId: string) => {
    setUser(getChatNameById(chatId));
    setActiveChatId(chatId);
  };

  useEffect(() => {
    if (!chats) dispatch(fetchChats());
  }, []);

  return (
    <div className="chat-app">
      <aside className="chat-list">
        {chats &&
          chats.map((item) => (
            <ChatSmall
              name={item.name}
              key={item.chatId}
              onClick={() => handleClickChat(item.chatId)}
            />
          ))}
      </aside>
      <Chat user={user} chatId={activeChatId} />
      <div className="new-button" onClick={handleNewChat}>
        Новый чат
      </div>
      <NewChatModal
        isOpen={isVisibleModal}
        onClose={() => setIsVisibleModal(false)}
        onSend={onSubmitNewChat}
      />
    </div>
  );
};

export default ChatMain;
