import { createSlice } from "@reduxjs/toolkit";
import { deleteNotification, receiveNotification } from "./thunks";
import { Notification } from "./types";

type TInitialState = {
  notification: Notification | null;
};

const initialState: TInitialState = {
  notification: null,
};

const notificationSlice = createSlice({
  name: "notificationSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(receiveNotification.fulfilled, (state, action) => {
      state.notification = action.payload;
    });
    builder.addCase(receiveNotification.rejected, (state) => {
      state.notification = null;
    });
    builder.addCase(deleteNotification.fulfilled, (state) => {
      state.notification = null;
    });
  },
});

export const {} = notificationSlice.actions;

export default notificationSlice;
