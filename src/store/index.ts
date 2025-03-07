import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import chatSlice from "./chatSlice";
import notificationSlice from "./notificationSlice";
import messagesSlice from "./messagesSlice";
import errorSlice from "./errorSlice";

const store = configureStore({
  reducer: {
    chats: chatSlice.reducer,
    notification: notificationSlice.reducer,
    messages: messagesSlice.reducer,
    error: errorSlice.reducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AddDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AddDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
