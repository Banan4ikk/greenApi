import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import apiClient from "../../api/apiClient";
import { Message } from "./types";

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
      return rejectWithValue(error);
    }
  }
);
