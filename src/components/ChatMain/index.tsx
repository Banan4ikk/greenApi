import React from "react";
import ChatSmall from "../ChatSmall";
import Chat from "../Chat";
import "./chatMain.scss";

const ChatMain = () => {
  return (
    <div className="chat-app">
      <aside className="chat-list">
        <ChatSmall name="Алексей" message="Привет!" time="12:30" active />
        <ChatSmall name="Мария" message="Как дела?" time="12:15" />
      </aside>
      <Chat />
    </div>
  );
};

export default ChatMain;
