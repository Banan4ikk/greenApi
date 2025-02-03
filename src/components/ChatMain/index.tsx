import React, { useState } from "react";
import ChatSmall from "../ChatSmall";
import Chat from "../Chat";
import "./chatMain.scss";
import NewChatModal from "../Modals/NewChat";

const ChatMain = () => {
  const [isVisibleChat, setIsVisibleChat] = useState(false);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [user, setUser] = useState("");

  const handleNewChat = () => setIsVisibleModal(true);
  const onSend = (userPhone: string) => {
    setUser(userPhone);
    setIsVisibleChat(true);
  };

  return (
    <div className="chat-app">
      <aside className="chat-list">
        <ChatSmall name="Алексей" message="Привет!" time="12:30" active />
        <ChatSmall name="Мария" message="Как дела?" time="12:15" />
      </aside>
      {isVisibleChat && <Chat user={user} />}
      <div className="new-button" onClick={handleNewChat}>
        Новый чат
      </div>
      <NewChatModal
        isOpen={isVisibleModal}
        onClose={() => setIsVisibleModal(false)}
        onSend={onSend}
      />
    </div>
  );
};

export default ChatMain;
