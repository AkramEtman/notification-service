import { NotificationSubscriptionDomainModel } from 'src/core/notifications/models/notificationSubscription';
import { NotificationSubscriptionDocument } from '../schemas/notificationSubscription';

export class NotificationSubscriptionMapper {
  public static toDomain(
    notificationSubscription: NotificationSubscriptionDocument,
  ): NotificationSubscriptionDomainModel {
    if (!notificationSubscription) {
      return null;
    }
    return new NotificationSubscriptionDomainModel(
      notificationSubscription._id,
      notificationSubscription.type.toString(),
      notificationSubscription.active,
      notificationSubscription.resourceId.toString(),
      notificationSubscription.resourceName,
    );
  }
}
