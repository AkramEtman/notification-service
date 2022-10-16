import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBadRequestResponse } from '@nestjs/swagger';
import { NotificationsService } from '../../core/notifications/services/notifications.service';
import { SendNotificationApiDto } from './dto/notifications.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  @Post()
  @ApiBadRequestResponse({
    description: 'Notification is not been subscribed for user or company',
  })
  @ApiBadRequestResponse({
    description: 'NotificationModel for notificationChannel is not found',
  })
  async sendNotification(@Body() sendNotificationDto: SendNotificationApiDto) {
    await this.notificationsService.send(sendNotificationDto);
  }

  @Get('/user/:userId/ui')
  getUINotification(@Param('userId') userId: string) {
    return this.notificationsService.getUINotifications(userId);
  }
}
