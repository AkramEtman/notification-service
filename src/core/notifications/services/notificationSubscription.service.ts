import { Inject, Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../../ports/notification.repository';
import { SendNotificationDto } from '../dto/notifications.dto';

@Injectable()
export class NotificationSubscriptionService {
  constructor(
    @Inject('NotificationsRepository')
    private notificationsRepository: NotificationsRepository,
  ) {}

  async isNotificationSubscribed(
    sendNotificationDto: SendNotificationDto,
  ): Promise<boolean> {
    const isCompanySubscription = await this.getCompanyNotificationSubscription(
      sendNotificationDto.companyId,
    );
    const isUserSubscription = await this.getUserNotificationSubscription(
      sendNotificationDto.userId,
    );
    return isCompanySubscription && isUserSubscription;
  }

  async getCompanyNotificationSubscription(
    companyId: string,
  ): Promise<boolean> {
    const companySubscription =
      await this.notificationsRepository.getNotificationSubscription(
        'company',
        companyId,
      );
    return companySubscription?.isSubscribed() || false;
  }

  async getUserNotificationSubscription(userId: string): Promise<boolean> {
    const userSubscription =
      await this.notificationsRepository.getNotificationSubscription(
        'user',
        userId,
      );
    return userSubscription?.isSubscribed() || false;
  }
}
