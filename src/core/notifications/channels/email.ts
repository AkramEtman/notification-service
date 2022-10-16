import { EmailNotificationPayload } from '../dto/notifications.dto';
import { NotificationTypeEnum } from '../notifications.contants';
import { NotificationChannel } from './notificationChannel.interface';

export class EmailNotification implements NotificationChannel {
  buildNotifiaction(
    notificationType: NotificationTypeEnum,
    notificationData: any,
  ): EmailNotificationPayload {
    // todo default values
    let subject = notificationType.toString();
    let content = notificationType.toString();

    if (notificationType === NotificationTypeEnum.HAPPY_BRITHDAY) {
      subject = `Happy Birthday ${notificationData.firstName}`;
      content = `${notificationData.company.name} is wishing you a happy birthday`;
    }

    return {
      subject,
      content,
    };
  }

  send(email: string, payload: EmailNotificationPayload) {
    console.log('Email is sent', {
      email,
      payload,
    });
  }

  public run(
    notificationType: NotificationTypeEnum,
    notificationData: any,
  ): void {
    const emailPayload = this.buildNotifiaction(
      notificationType,
      notificationData,
    );
    this.send(notificationData.email, emailPayload);
  }
}
