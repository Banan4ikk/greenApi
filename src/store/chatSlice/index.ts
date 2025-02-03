import { createSlice } from "@reduxjs/toolkit";
import { Chat, fetchChats, saveChat, Message, fetchMessages } from "./thunks";
import { Meta } from "../types";

type TInitialState = {
  chats: Array<Chat> | null;
  messages: Array<Message> | null;
  meta: Meta;
};

const initialState: TInitialState = {
  chats: null,
  messages: null,
  meta: { errors: null, loading: false },
};

const chatSlice = createSlice({
  name: "chatSlice",
  initialState,
  reducers: {},
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

export const {} = chatSlice.actions;

export default chatSlice;
