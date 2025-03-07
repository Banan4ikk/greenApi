import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  deleteNotification,
  receiveNotification,
} from "../../store/notificationSlice/thunks";
import { addMessageNotify } from "../../store/messagesSlice";

const POLLING_INTERVAL = 5000; // 5 секунд

const useShortPolling = (customInterval?: number) => {
  const dispatch = useAppDispatch();
  const { notification } = useAppSelector((state) => state.notification);
  const { activeChatId } = useAppSelector((state) => state.chats);

  const handleNotification = () => {
    if (
      notification &&
      notification.body.typeWebhook === "incomingMessageReceived"
    ) {
      dispatch(
        addMessageNotify({
          chatId: notification.body.messageData.chatId,
          message: notification.body.messageData,
          activeChatId,
        })
      );
      dispatch(deleteNotification({ receiptId: notification.receiptId }));
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(receiveNotification());
      handleNotification();
    }, customInterval || POLLING_INTERVAL);

    return () => clearInterval(interval);
  }, []);
};

export default useShortPolling;
