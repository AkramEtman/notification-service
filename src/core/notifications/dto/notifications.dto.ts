import {
  NotificationChannelTypeEnum,
  NotificationTypeEnum,
} from '../notifications.contants';

export interface CreateNotificationDto {
  companyId: string;
  userId: string;
  channel: NotificationChannelTypeEnum;
  typeId: string;
}

export interface SendNotificationDto {
  companyId: string;
  userId: string;
  notificationType: NotificationTypeEnum;
}

interface NotificationPayload {
  content: string;
}
export interface EmailNotificationPayload extends NotificationPayload {
  subject: string;
}
export type UINotificationPayload = NotificationPayload;
