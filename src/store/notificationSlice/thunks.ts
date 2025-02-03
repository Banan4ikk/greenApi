import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import apiClient from "../../api/apiClient";
import { Notification, SendDeleteNotificationData } from "./types";

export const receiveNotification = createAsyncThunk<Notification>(
  "notification/receive",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: AxiosResponse<Notification> = await apiClient.get(
        "/ReceiveNotification"
      );
      if (response.status !== 200) {
        return rejectWithValue(response.data);
      }
      return fulfillWithValue(response.data);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const deleteNotification = createAsyncThunk<
  Notification,
  SendDeleteNotificationData
>(
  "notification/delete",
  async ({ receiptId }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response: AxiosResponse<Notification> = await apiClient.get(
        `/DeleteNotification/${receiptId}`
      );
      if (response.status !== 200) {
        return rejectWithValue(response.data);
      }
      return fulfillWithValue(response.data);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
