import { Module } from '@nestjs/common';
import { AdaptersModule } from 'src/adapters/adapters.module';
import { NotificationsModule } from './notifications/notifications.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [NotificationsModule, UsersModule, AdaptersModule],
})
export class CoreModule {}
