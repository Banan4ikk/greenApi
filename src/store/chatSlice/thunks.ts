import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import foreignClient from "../../api/foreignClient";
import apiClient from "../../api/apiClient";

export type Chat = {
  name: string;
  chatId: string;
};

type ExtendedTextMessage = {
  text: string;
  description: string;
  title: string;
  previewType: string;
  jpegThumbnail: string;
  forwardingScore: number;
  isForwarded: boolean;
};

export type Message = {
  type: "outgoing" | "incoming";
  idMessage: string;
  timestamp: number;
  typeMessage: "extendedTextMessage";
  chatId: string;
  textMessage: string;
  extendedTextMessage: ExtendedTextMessage;
  statusMessage: string;
  sendByApi: boolean;
  deletedMessageId: string;
  editedMessageId: string;
  isEdited: boolean;
  isDeleted: boolean;
};

export const fetchChats = createAsyncThunk<Chat[]>(
  "messages/fetchChats", // Префикс для типов действий
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: AxiosResponse<Array<Chat>> = await foreignClient.get(
        "/chats"
      );
      if (response.status !== 200) {
        return rejectWithValue(response.data);
      }
      return fulfillWithValue(response.data);
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const saveChat = createAsyncThunk<any, Chat>(
  "messages/saveChat", // Префикс для типов действий
  async (data, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await foreignClient.post("/chats", { ...data });
      if (response.status !== 201) {
        return rejectWithValue(response.data);
      }
      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchMessages = createAsyncThunk<any, string>(
  "messages/fetchMessages",
  async (chatId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: AxiosResponse<Array<Message>> = await apiClient.post(
        "/getChatHistory",
        { chatId }
      );
      if (response.status !== 200) {
        return rejectWithValue(response.data);
      }
      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error); // Возвращаем ошибку
    }
  }
);
