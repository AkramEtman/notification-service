import { Module } from '@nestjs/common';
import { NotificationsTypegooseRepository } from 'src/adapters/database/typegoose/repositories/notifications.repository';
import { UsersModule } from '../users/users.module';
import { NotificationsController } from '../../adapters/controllers/notifications.controller';
import { NotificationsService } from './services/notifications.service';
import { DatabaseModule } from 'src/adapters/database/database.module';
import { NotificationSubscriptionService } from './services/notificationSubscription.service';
import { UsersService } from '../users/user.service';

@Module({
  imports: [UsersModule, DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    NotificationsService,
    NotificationSubscriptionService,
    UsersService,
    {
      provide: 'NotificationsRepository',
      useClass: NotificationsTypegooseRepository,
    },
  ],
})
export class NotificationsModule {}
