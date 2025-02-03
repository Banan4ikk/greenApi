import axios from "axios";

const apiClient = axios.create({
  baseURL: `${process.env.API_URL}/waInstance${process.env.ID_INSTANCE}`,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  // Изменяем URL, добавляя apiTokenInstance
  config.url = `${config.url}/${process.env.API_TOKEN_INSTANCE}`;
  return config;
});

export default apiClient;
