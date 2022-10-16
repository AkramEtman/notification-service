import { Module } from '@nestjs/common';
import { TypegooseModule } from './typegoose/typegooose.module';

@Module({
  imports: [TypegooseModule],
  exports: [TypegooseModule],
})
export class DatabaseModule {}
