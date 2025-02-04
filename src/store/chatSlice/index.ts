import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchChats, saveChat } from "./thunks";
import { Meta } from "../types";
import { Chat } from "./types";

type TInitialState = {
  chats: Array<Chat> | null;
  activeChatId: string | null;
  meta: Meta;
};

const initialState: TInitialState = {
  chats: null,
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
    addChat: (state, { payload }: PayloadAction<Chat>) => {
      if (!state.chats) state.chats = [];
      state.chats = [...state.chats, payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChats.fulfilled, (state, action) => {
      state.meta.loading = false;
      state.chats = action.payload;
    });
    builder.addCase(fetchChats.pending, (state) => {
      state.meta.loading = true;
    });
    builder.addCase(fetchChats.rejected, (state) => {
      state.meta.loading = false;
    });

    builder.addCase(saveChat.fulfilled, (state) => {
      state.meta.loading = false;
    });
    builder.addCase(saveChat.pending, (state) => {
      state.meta.loading = true;
    });
    builder.addCase(saveChat.rejected, (state) => {
      state.meta.loading = false;
    });
  },
});

export const { setActiveChatId, resetActiveChatId, addChat } =
  chatSlice.actions;

export default chatSlice;
