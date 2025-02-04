import { createSlice, isRejected, SerializedError } from "@reduxjs/toolkit";
import axios from "axios";

// Тип кастомной ошибки
export type CustomError = {
  invokeStatus: {
    method: string;
    used: number;
    total: null;
    status: string;
    description: string;
  };
  correspondentsStatus: {
    method: string;
    used: number;
    total: number;
    status: string;
    description: string;
  };
};

interface ErrorState {
  message: string | null;
}

const initialState: ErrorState = {
  message: null,
};

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    hideError: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isRejected, // Ловим все rejected-экшены
      (state, action) => {
        const { payload, error } = action;

        if (axios.isAxiosError(payload)) {
          state.message = payload.message || "Ошибка сети";
          return;
        }

        if (
          payload &&
          typeof payload === "object" &&
          "correspondentsStatus" in payload
        ) {
          state.message = (
            payload as CustomError
          ).correspondentsStatus.description;
          return;
        }

        if (error) {
          state.message =
            (error as SerializedError)?.message || "Произошла ошибка";
        }
      }
    );
  },
});

export const { hideError } = errorSlice.actions;
export default errorSlice;
