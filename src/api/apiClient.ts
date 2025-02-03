import axios from "axios";
import { getInstanceData } from "../utils";

const { API_TOKEN_INSTANCE, ID_INSTANCE, API_URL } = getInstanceData();

const apiClient = axios.create({
  baseURL: `${API_URL}/waInstance${ID_INSTANCE}`,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  // Изменяем URL, добавляя apiTokenInstance
  config.url = `${config.url}/${API_TOKEN_INSTANCE}`;
  return config;
});

export default apiClient;
