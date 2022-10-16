import { NotificationTypeEnum } from '../notifications.contants';
import { NotificationChannel } from './notificationChannel.interface';

export class UINotification implements NotificationChannel {
  run(notificationType: NotificationTypeEnum, notificationData: any): void {
    console.log('UI Notification');
  }
}
