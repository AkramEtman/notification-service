import { NotificationDomainModel } from 'src/core/notifications/models/notifications';
import { NotificationDocument } from '../schemas/notification';

export class NotificationMapper {
  public static toDomain(
    notification: NotificationDocument,
  ): NotificationDomainModel {
    if (!notification) {
      return null;
    }
    return new NotificationDomainModel(
      notification._id,
      notification.typeId.toString(),
      notification.channel,
      notification.userId,
      notification.companyId,
    );
  }

  public static toDomains(
    notifications: NotificationDocument[],
  ): NotificationDomainModel[] {
    const notificationsDomains: NotificationDomainModel[] = [];
    notifications.forEach((notification) => {
      const notificationDomain = this.toDomain(notification);
      notificationsDomains.push(notificationDomain);
    });
    return notificationsDomains;
  }
}
