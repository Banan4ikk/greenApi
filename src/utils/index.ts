import {
  STORAGE_API_TOKEN_INSTANCE,
  STORAGE_API_URL,
  STORAGE_ID_INSTANCE,
} from "../constants";

export const getChatId = (phone: string) => {
  return `${phone}@c.us`;
};

export const getChatNameById = (chatId: string) => {
  return chatId.split("@")[0];
};

export const getInstanceData = () => {
  const apiUrl = localStorage.getItem(STORAGE_API_URL);
  const idInstance = localStorage.getItem(STORAGE_ID_INSTANCE);
  const apiTokenInstance = localStorage.getItem(STORAGE_API_TOKEN_INSTANCE);

  const API_URL = apiUrl ? JSON.parse(apiUrl) : null;
  const ID_INSTANCE = idInstance ? JSON.parse(idInstance) : null;
  const API_TOKEN_INSTANCE = apiTokenInstance
    ? JSON.parse(apiTokenInstance)
    : null;

  return { API_URL, ID_INSTANCE, API_TOKEN_INSTANCE };
};

export const isEmptyInstanceData = () => {
  const { API_URL, API_TOKEN_INSTANCE, ID_INSTANCE } = getInstanceData();

  return !API_URL || !API_TOKEN_INSTANCE || !ID_INSTANCE;
};
