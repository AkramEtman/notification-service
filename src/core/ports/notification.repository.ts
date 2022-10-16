import { CreateNotificationDto } from '../notifications/dto/notifications.dto';
import { NotificationDomainModel } from '../notifications/models/notifications';
import { NotificationSubscriptionDomainModel } from '../notifications/models/notificationSubscription';
import { NotificationTypeDomainModel } from '../notifications/models/notificationType';
import {
  NotificationChannelTypeEnum,
  NotificationSubscriptionResource,
  NotificationTypeEnum,
} from '../notifications/notifications.contants';

export interface NotificationsRepository {
  create(notification: CreateNotificationDto): Promise<NotificationDomainModel>;
  getNotificationsByChannel(
    userId: string,
    notificationChannel: NotificationChannelTypeEnum,
  ): Promise<NotificationDomainModel[]>;
  getNotificationChannels(
    notificationType: NotificationTypeEnum,
  ): Promise<NotificationChannelTypeEnum[]>;
  getNotificationType(
    notificationType: NotificationTypeEnum,
  ): Promise<NotificationTypeDomainModel>;
  getNotificationSubscription(
    resourceName: NotificationSubscriptionResource,
    resourceId: string,
  ): Promise<NotificationSubscriptionDomainModel>;
}
