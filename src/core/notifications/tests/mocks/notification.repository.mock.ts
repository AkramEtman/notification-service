import { NotificationsRepository } from 'src/core/ports/notification.repository';
import { NotificationChannelTypeEnum } from '../../notifications.contants';
import { NotificationStub } from '../stubs/notification.stub';
import { NotificationSubscriptionStub } from '../stubs/notificationSubscription.stub';
import { NotificationTypeStub } from '../stubs/notificationType.stub';

export const NotificationsRepositoryMock: NotificationsRepository = {
  getNotificationsByChannel: jest.fn().mockResolvedValue(NotificationStub()),
  getNotificationChannels: jest
    .fn()
    .mockResolvedValue([NotificationChannelTypeEnum.EMAIL]),
  getNotificationSubscription: jest
    .fn()
    .mockResolvedValue(NotificationSubscriptionStub()),
  getNotificationType: jest.fn().mockResolvedValue(NotificationTypeStub()),
  create: jest.fn().mockResolvedValue(NotificationStub()),
};
