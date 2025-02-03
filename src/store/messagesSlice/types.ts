export type ExtendedTextMessage = {
  text: string;
  description?: string;
  title?: string;
  previewType?: string;
  jpegThumbnail?: string;
  forwardingScore?: number;
  isForwarded?: boolean;
};

export type Message = {
  type: "outgoing" | "incoming";
  idMessage: string;
  timestamp?: number;
  typeMessage?: "extendedTextMessage";
  chatId: string;
  textMessage?: string;
  extendedTextMessage: ExtendedTextMessage;
  statusMessage?: string;
  sendByApi?: boolean;
  deletedMessageId?: string;
  editedMessageId?: string;
  isEdited?: boolean;
  isDeleted?: boolean;
};

export type AddMessageNotifyPayload = {
  chatId: string;
  message: Message;
  activeChatId: string | null;
};

export type AddMessage = {
  messageId: string;
  text: string;
  chatId: string;
  activeChatId: string | null;
};

export type Chat = {
  name: string;
  chatId: string;
};

export type ReturnMessage = {
  messageId: string;
};
