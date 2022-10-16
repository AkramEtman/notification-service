import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AdaptersModule } from './adapters/adapters.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [AdaptersModule, CoreModule, ConfigModule.forRoot()],
})
export class AppModule {}
