import { Message } from "../chatSlice/types";

type InstanceData = {
  idInstance: 1234;
  wid: string;
  typeInstance: string;
};

type SenderData = {
  chatId: string;
  sender: string;
  senderName: string;
  senderContactName: string;
};

type NotificationBody = {
  typeWebhook: string;
  instanceData: InstanceData;
  timestamp: number;
  idMessage: string;
  senderData: SenderData;
  messageData: Message;
};

export type Notification = {
  receiptId: number;
  body: NotificationBody;
};

export type SendDeleteNotificationData = {
  receiptId: number;
};
