export const getChatId = (phone: string) => {
  return `${phone}@c.us`;
};

export const getChatNameById = (chatId: string) => {
  return chatId.split("@")[0];
};
