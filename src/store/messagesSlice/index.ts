import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchMessages } from "./thunks";
import { Meta } from "../types";
import { AddMessage, AddMessageNotifyPayload, Message } from "./types";

type TInitialState = {
  messages: Array<Message> | null;
  meta: Meta;
};

const initialState: TInitialState = {
  messages: null,
  meta: { errors: null, loading: false },
};

const messagesSlice = createSlice({
  name: "messageSlice",
  initialState,
  reducers: {
    addMessageNotify: (
      state,
      { payload }: PayloadAction<AddMessageNotifyPayload>
    ) => {
      if (!state.messages || payload.activeChatId !== payload.chatId) return;

      state.messages = [...state.messages, payload.message];
    },
    addMessage: (state, { payload }: PayloadAction<AddMessage>) => {
      if (!state.messages || payload.activeChatId !== payload.chatId) return;

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
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMessages.fulfilled, (state, action) => {
      state.meta.loading = false;
      state.messages = action.payload.reverse();
    });
    builder.addCase(fetchMessages.pending, (state) => {
      state.meta.loading = true;
    });
    builder.addCase(fetchMessages.rejected, (state, action) => {
      state.meta.errors = action.payload;
      state.meta.loading = false;
    });
  },
});

export const { addMessageNotify, addMessage } = messagesSlice.actions;

export default messagesSlice;
