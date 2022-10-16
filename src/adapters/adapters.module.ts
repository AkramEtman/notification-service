import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ScheduleModule.forRoot(), DatabaseModule],
  controllers: [],
  providers: [],
})
export class AdaptersModule {}
