import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { NotificationsService } from 'src/core/notifications/services/notifications.service';

@Injectable()
export class NotificationSchedulerService {
  constructor(private notificationsService: NotificationsService) {}

  @Cron('00 6 31 12 *')
  handleLeaveBalanceReminder() {
    console.log('handleLeaveBalanceReminder');
    console.log('Get All compaines who activate LeaveBalanceReminder');
    console.log('Get All user for compaines who activate LeaveBalanceReminder');
    console.log('Call sendNotification from core');
  }

  @Cron('0 6 * * *')
  handleBirthDayNotification() {
    console.log('handleBirthDayNotification');
    console.log('Get All compaines who activate handleBirthDayNotification');
    console.log(
      'Get All user for compaines who activate handleBirthDayNotification',
    );
    console.log('Call sendNotification from core');
  }
}
