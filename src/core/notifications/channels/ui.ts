import { UINotificationPayload } from '../dto/notifications.dto';
import { NotificationTypeEnum } from '../notifications.contants';
import { NotificationChannel } from './notificationChannel.interface';

export class UINotification implements NotificationChannel {
  buildNotifiaction(
    notificationType: NotificationTypeEnum,
    notificationData: any,
  ): UINotificationPayload {
    // todo default values
    let content = notificationType.toString();

    if (notificationType === NotificationTypeEnum.HAPPY_BRITHDAY) {
      content = `Happy Birthday ${notificationData.firstName}`;
    }

    return { content };
  }

  send(notificationData: any, payload: UINotificationPayload) {
    console.log('UI is sent', {
      payload,
    });
  }
  run(notificationType: NotificationTypeEnum, notificationData: any): void {
    const emailPayload = this.buildNotifiaction(
      notificationType,
      notificationData,
    );
    this.send(notificationData, emailPayload);
  }
}
