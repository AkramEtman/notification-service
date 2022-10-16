import { NotificationTypeEnum } from '../notifications.contants';

export interface NotificationChannel {
  run(notificationType: NotificationTypeEnum, notificationData: any): void;
}
