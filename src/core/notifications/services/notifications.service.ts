import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../../ports/notification.repository';
import { UsersService } from '../../users/user.service';
import { NotificationChannel } from '../channels/notificationChannel.interface';
import { NotificationChannelContext } from '../channels/notificationChannelContext';
import {
  CreateNotificationDto,
  SendNotificationDto,
} from '../dto/notifications.dto';
import { NotificationDomainModel } from '../models/notifications';
import { NotificationTypeDomainModel } from '../models/notificationType';
import {
  NotificationChannelTypeEnum,
  NotificationTypeEnum,
  NotificationChannelModelEnum,
} from '../notifications.contants';
import { NotificationSubscriptionService } from './notificationSubscription.service';

@Injectable()
export class NotificationsService {
  constructor(
    @Inject('NotificationsRepository')
    private notificationsRepository: NotificationsRepository,
    private notificationSubscriptionService: NotificationSubscriptionService,
    private usersService: UsersService,
  ) {}

  async send(sendNotificationDto: SendNotificationDto) {
    const isSubscribed =
      await this.notificationSubscriptionService.isNotificationSubscribed(
        sendNotificationDto,
      );
    if (!isSubscribed) {
      throw new BadRequestException(
        'Notification is not been subscribed for user or company',
      );
    }
    const notificationType =
      await this.notificationsRepository.getNotificationType(
        sendNotificationDto.notificationType,
      );
    this.sendNotification(notificationType, sendNotificationDto);
  }

  async getUINotifications(userId: string) {
    const notificationChannel = NotificationChannelTypeEnum.UI;
    return this.getNotifications(userId, notificationChannel);
  }

  getNotifications(
    userId: string,
    notificationChannel: NotificationChannelTypeEnum,
  ): Promise<NotificationDomainModel[]> {
    return this.notificationsRepository.getNotificationsByChannel(
      userId,
      notificationChannel,
    );
  }

  async sendNotification(
    notificationType: NotificationTypeDomainModel,
    sendNotificationDto: SendNotificationDto,
  ) {
    let notificationContext: NotificationChannelContext;
    const channels = notificationType.getChannels();

    for (const notificationChannel of channels) {
      const NotificationModel = this.getNotificationModel(notificationChannel);
      notificationContext = this.getNotificationContext(
        notificationContext,
        NotificationModel,
      );

      const notificationPayload =
        this.usersService.getUserDataForNotificationType(
          sendNotificationDto.notificationType,
        );
      console.log('inside',notificationContext.send)
      await notificationContext.send(
        sendNotificationDto.notificationType,
        notificationPayload,
      );
      console.log('EXit')

      const notification: CreateNotificationDto = {
        companyId: sendNotificationDto.companyId,
        userId: sendNotificationDto.userId,
        channel: notificationChannel,
        typeId: notificationType.getId(),
      };
      this.notificationsRepository.create(notification);
    }
  }

  getNotificationModel(
    notificationChannel: NotificationChannelTypeEnum,
  ): NotificationChannel {
    const NotificationModel = NotificationChannelModelEnum[notificationChannel];
    if (NotificationModel === undefined) {
      throw new BadRequestException(
        'NotificationModel for notificationChannel is not found',
      );
    }
    return new NotificationModel();
  }

  getNotificationContext(
    notificationContext: NotificationChannelContext,
    NotificationChannelModel: NotificationChannel,
  ): NotificationChannelContext {
    if (notificationContext !== undefined) {
      notificationContext.setStrategy(NotificationChannelModel);
    }
    return new NotificationChannelContext(NotificationChannelModel);
  }

  async sendNotificationsByType(notificationTypeName: NotificationTypeEnum) {
    const compainesIds: string[] =
      this.usersService.getActivatedCompaniesForNotification(
        notificationTypeName,
      );
    const usersByCompanies: { userId: string; companyId: string }[] =
      this.usersService.getUsersByComapanies(compainesIds);
    const notificationType =
      await this.notificationsRepository.getNotificationType(
        notificationTypeName,
      );

    for (const userCompany of usersByCompanies) {
      const notification: SendNotificationDto = {
        userId: userCompany.userId,
        companyId: userCompany.companyId,
        notificationType: notificationTypeName,
      };
      this.sendNotification(notificationType, notification);
    }
  }
}
