import { NotificationTypeDomainModel } from 'src/core/notifications/models/notificationType';
import { NotificationTypeDocument } from '../schemas/notificationType';

export class NotificationTypeMapper {
  public static toDomain(
    notificationType: NotificationTypeDocument,
  ): NotificationTypeDomainModel {
    if (!notificationType) {
      return null;
    }
    return new NotificationTypeDomainModel(
      notificationType._id,
      notificationType.name,
      notificationType.channels,
    );
  }
}
