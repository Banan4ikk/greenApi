import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import foreignClient from "../../api/foreignClient";
import apiClient from "../../api/apiClient";
import { Chat, Message } from "./types";

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
