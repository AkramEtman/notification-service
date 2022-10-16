import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { NotificationsRepository } from 'src/core/ports/notification.repository';
import { NotificationDocument, Notification } from '../schemas/notification';
import { NotificationDomainModel } from 'src/core/notifications/models/notifications';
import { NotificationSubscriptionDomainModel } from 'src/core/notifications/models/notificationSubscription';
import {
  NotificationSubscription,
  NotificationSubscriptionDocument,
} from '../schemas/notificationSubscription';
import {
  NotificationType,
  NotificationTypeDocument,
} from '../schemas/notificationType';
import { NotificationMapper } from '../mappers/notification.mapper';
import { NotificationSubscriptionMapper } from '../mappers/notificationSubscription.mapper';
import { CreateNotificationDto } from 'src/core/notifications/dto/notifications.dto';
import { NotificationTypeDomainModel } from 'src/core/notifications/models/notificationType';
import { NotificationTypeMapper } from '../mappers/notificationType.mapper';
import {
  NotificationTypeEnum,
  NotificationChannelTypeEnum,
  NotificationSubscriptionResource,
} from 'src/core/notifications/notifications.contants';

export class NotificationsTypegooseRepository
  implements NotificationsRepository
{
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<NotificationDocument>,
    @InjectModel(NotificationType.name)
    private notificationTypeModel: Model<NotificationTypeDocument>,
    @InjectModel(NotificationSubscription.name)
    private notificationSubscriptionModel: Model<NotificationSubscriptionDocument>,
  ) {
    const happyId = new mongoose.Types.ObjectId();
    const leaveId = new mongoose.Types.ObjectId();
    const payslipId = new mongoose.Types.ObjectId();
    notificationTypeModel
      .insertMany([
        {
          _id: happyId,
          name: NotificationTypeEnum.HAPPY_BRITHDAY,
          channels: [
            NotificationChannelTypeEnum.EMAIL,
            NotificationChannelTypeEnum.UI,
          ],
        },
        {
          _id: leaveId,
          name: NotificationTypeEnum.LEAVE_BALANCE_REMINDER,
          channels: [NotificationChannelTypeEnum.EMAIL],
        },
        {
          _id: payslipId,
          name: NotificationTypeEnum.MONTHLY_PAYSLIP,
          channels: [NotificationChannelTypeEnum.UI],
        },
      ])
      .then(() => {
        notificationSubscriptionModel
          .insertMany([
            {
              type: happyId,
              resourceName: 'company',
              resourceId: '3001',
              active: true,
            },
            {
              type: leaveId,
              resourceName: 'company',
              resourceId: '3001',
              active: true,
            },
            {
              type: payslipId,
              resourceName: 'company',
              resourceId: '3001',
              active: true,
            },
            {
              type: happyId,
              resourceName: 'user',
              resourceId: '1001',
              active: true,
            },
            {
              type: leaveId,
              resourceName: 'user',
              resourceId: '1001',
              active: true,
            },
            {
              type: payslipId,
              resourceName: 'user',
              resourceId: '1001',
              active: true,
            },

            {
              type: happyId,
              resourceName: 'company',
              resourceId: '3002',
              active: true,
            },
            {
              type: leaveId,
              resourceName: 'company',
              resourceId: '3002',
              active: false,
            },
            {
              type: payslipId,
              resourceName: 'company',
              resourceId: '3002',
              active: false,
            },
            {
              type: happyId,
              resourceName: 'user',
              resourceId: '1002',
              active: true,
            },
            {
              type: leaveId,
              resourceName: 'user',
              resourceId: '1002',
              active: true,
            },
            {
              type: payslipId,
              resourceName: 'user',
              resourceId: '1002',
              active: false,
            },

            {
              type: happyId,
              resourceName: 'company',
              resourceId: '3003',
              active: false,
            },
            {
              type: leaveId,
              resourceName: 'company',
              resourceId: '3003',
              active: false,
            },
            {
              type: payslipId,
              resourceName: 'company',
              resourceId: '3003',
              active: false,
            },
            {
              type: happyId,
              resourceName: 'user',
              resourceId: '1003',
              active: true,
            },
          ])
          .then(() => {
            console.log('Database seeds');
          });
      });
  }

  async getNotificationType(
    name: NotificationTypeEnum,
  ): Promise<NotificationTypeDomainModel> {
    const notificationType = await this.notificationTypeModel.findOne({ name });
    return NotificationTypeMapper.toDomain(notificationType);
  }

  async create(
    notificationDto: CreateNotificationDto,
  ): Promise<NotificationDomainModel> {
    const notification = await this.notificationModel.create(notificationDto);
    return NotificationMapper.toDomain(notification);
  }

  async getNotificationsByChannel(
    userId: string,
    notificationChannel: NotificationChannelTypeEnum,
  ): Promise<NotificationDomainModel[]> {
    const notifications = await this.notificationModel
      .find({
        userId: userId,
        channel: notificationChannel,
      })
      .exec();
    return NotificationMapper.toDomains(notifications);
  }

  async getNotifications(
    userId: string,
    notificationChannel: NotificationChannelTypeEnum,
  ): Promise<NotificationDomainModel[]> {
    const notifications = await this.notificationModel
      .find({ userId: userId, channel: notificationChannel })
      .exec();
    return NotificationMapper.toDomains(notifications);
  }

  async getNotificationChannels(
    type: NotificationTypeEnum,
  ): Promise<NotificationChannelTypeEnum[]> {
    const notificationType = await this.notificationTypeModel
      .findOne({ name: type })
      .exec();
    if (notificationType === null) {
      return [];
    }
    return notificationType.channels;
  }

  async getNotificationSubscription(
    resourceName: NotificationSubscriptionResource,
    resourceId: string,
  ): Promise<NotificationSubscriptionDomainModel> {
    const notificationSubscription = await this.notificationSubscriptionModel
      .findOne({ resourceId, resourceName })
      .exec();
    return NotificationSubscriptionMapper.toDomain(notificationSubscription);
  }
}
