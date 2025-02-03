import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchChats, fetchMessages, saveChat } from "./thunks";
import { Meta } from "../types";
import { AddMessage, AddMessageNotifyPayload, Chat, Message } from "./types";
import store from "../index";

type TInitialState = {
  chats: Array<Chat> | null;
  messages: Array<Message> | null;
  activeChatId: string | null;
  meta: Meta;
};

const initialState: TInitialState = {
  chats: null,
  messages: null,
  activeChatId: null,
  meta: { errors: null, loading: false },
};

const chatSlice = createSlice({
  name: "chatSlice",
  initialState,
  reducers: {
    setActiveChatId: (state, { payload }: PayloadAction<string>) => {
      state.activeChatId = payload;
    },
    resetActiveChatId: (state) => {
      state.activeChatId = null;
    },
    addMessageNotify: (
      state,
      { payload }: PayloadAction<AddMessageNotifyPayload>
    ) => {
      if (!state.messages || state.activeChatId !== payload.chatId) return;

      state.messages = [...state.messages, payload.message];
    },
    addMessage: (state, { payload }: PayloadAction<AddMessage>) => {
      if (!state.messages || state.activeChatId !== payload.chatId) return;

      const newMessage: Message = {
        type: "outgoing",
        idMessage: payload.messageId,
        chatId: payload.chatId,
        extendedTextMessage: {
          text: payload.text,
        },
      };

      state.messages = [...state.messages, newMessage];
    },
    addChat: (state, { payload }: PayloadAction<Chat>) => {
      if (!state.chats) return;
      state.chats = [...state.chats, payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChats.fulfilled, (state, action) => {
      state.meta.loading = false;
      state.chats = action.payload;
    });
    builder.addCase(fetchChats.pending, (state, action) => {
      state.meta.loading = true;
    });
    builder.addCase(fetchChats.rejected, (state, action) => {
      state.meta.errors = action.payload;
      state.meta.loading = false;
    });

    builder.addCase(saveChat.fulfilled, (state, action) => {
      state.meta.loading = false;
    });
    builder.addCase(saveChat.pending, (state, action) => {
      state.meta.loading = true;
    });
    builder.addCase(saveChat.rejected, (state, action) => {
      state.meta.errors = action.payload;
      state.meta.loading = false;
    });

    builder.addCase(fetchMessages.fulfilled, (state, action) => {
      state.meta.loading = false;
      state.messages = action.payload.reverse();
    });
    builder.addCase(fetchMessages.pending, (state, action) => {
      state.meta.loading = true;
    });
    builder.addCase(fetchMessages.rejected, (state, action) => {
      state.meta.errors = action.payload;
      state.meta.loading = false;
    });
  },
});

export const {
  setActiveChatId,
  resetActiveChatId,
  addMessageNotify,
  addMessage,
  addChat,
} = chatSlice.actions;

export default chatSlice;
