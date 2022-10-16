import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Notification, NotificationSchema } from './schemas/notification';
import {
  NotificationSubscription,
  NotificationSubscriptionSchema,
} from './schemas/notificationSubscription';
import {
  NotificationType,
  NotificationTypeSchema,
} from './schemas/notificationType';
import { NotificationsTypegooseRepository } from './repositories/notifications.repository';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
    }),
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
    ]),
    MongooseModule.forFeature([
      { name: NotificationType.name, schema: NotificationTypeSchema },
    ]),
    MongooseModule.forFeature([
      {
        name: NotificationSubscription.name,
        schema: NotificationSubscriptionSchema,
      },
    ]),
  ],
  providers: [NotificationsTypegooseRepository],
  exports: [
    NotificationsTypegooseRepository,
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
    ]),
    MongooseModule.forFeature([
      { name: NotificationType.name, schema: NotificationTypeSchema },
    ]),
    MongooseModule.forFeature([
      {
        name: NotificationSubscription.name,
        schema: NotificationSubscriptionSchema,
      },
    ]),
  ],
})
export class TypegooseModule {}
