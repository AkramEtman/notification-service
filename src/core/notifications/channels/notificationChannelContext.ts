import { NotificationTypeEnum } from '../notifications.contants';
import { NotificationChannel } from './notificationChannel.interface';

export class NotificationChannelContext {
  private notification: NotificationChannel;

  constructor(notification: NotificationChannel) {
    this.notification = notification;
  }

  public setStrategy(notification: NotificationChannel) {
    this.notification = notification;
  }

  public send(
    notificationType: NotificationTypeEnum,
    notificationData: any,
  ): void {
    this.notification.run(notificationType, notificationData);
  }
}
