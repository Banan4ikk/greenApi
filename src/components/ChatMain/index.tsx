import React, { useEffect, useRef, useState } from "react";
import { fetchChats, saveChat } from "../../store/chatSlice/thunks";
import { getChatId, getChatNameById, isEmptyInstanceData } from "../../utils";
import { useAppDispatch, useAppSelector } from "../../store";
import ChatSmall from "../ChatSmall";
import Chat from "../Chat";
import NewChatModal from "../Modals/NewChat";
import apiClient from "../../api/apiClient";
import "./chatMain.scss";
import { addChat, setActiveChatId } from "../../store/chatSlice";
import useShortPolling from "../../utils/hooks/useShortPolling";
import Loader from "../Loader";
import AddInstanceData from "../Modals/AddInstanceData";

const ChatMain = () => {
  const dispatch = useAppDispatch();
  const { chats, meta } = useAppSelector((store) => store.chats);
  const isFirstRender = useRef(true); // чтобы не вызывалось 2 раза
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [user, setUser] = useState("");
  const [isVisibleInstanceModal, setIsVisibleInstanceModal] = useState(false);

  useShortPolling();

  const handleNewChat = () => setIsVisibleModal(true);

  const onSubmitNewChat = (userPhone: string) => {
    setUser(userPhone);
    dispatch(setActiveChatId(getChatId(userPhone)));
    dispatch(saveChat({ name: userPhone, chatId: getChatId(userPhone) }));
    dispatch(addChat({ name: userPhone, chatId: getChatId(userPhone) }));
  };
  const handleClickChat = (chatId: string) => {
    setUser(getChatNameById(chatId));
    dispatch(setActiveChatId(chatId));
  };

  const setSettings = async () => {
    isFirstRender.current = false;
    await apiClient.post("/setSettings", {
      webhookUrl: "",
      outgoingWebhook: "yes",
      stateWebhook: "yes",
      incomingWebhook: "yes",
    });
  };

  const onCloseInstanceModal = () => {
    setIsVisibleInstanceModal(false);
  };

  useEffect(() => {
    if (isEmptyInstanceData()) {
      setIsVisibleInstanceModal(true);
      return;
    }
    if (!chats) dispatch(fetchChats());
    if (isFirstRender.current) setSettings();
  }, [isEmptyInstanceData]);

  return (
    <div className="chat-app">
      {meta.loading ? (
        <Loader />
      ) : (
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
      )}
      <Chat user={user} />
      <div className="new-button" onClick={handleNewChat}>
        Новый чат
      </div>
      <NewChatModal
        isOpen={isVisibleModal}
        onClose={() => setIsVisibleModal(false)}
        onSend={onSubmitNewChat}
      />
      <AddInstanceData
        isOpen={isVisibleInstanceModal}
        onClose={onCloseInstanceModal}
      />
    </div>
  );
};

export default ChatMain;
