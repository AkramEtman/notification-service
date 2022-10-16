import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { NotificationChannelTypeEnum } from 'src/core/notifications/notifications.contants';
import { Document } from 'mongoose';

export type NotificationTypeDocument = NotificationType & Document;

@Schema()
export class NotificationType {
  @Prop({ type: () => String, required: true, unique: true })
  name: string;

  @Prop({
    type: () => [String],
    enum: Object.values(NotificationChannelTypeEnum),
    required: true,
  })
  channels: NotificationChannelTypeEnum[];
}
export const NotificationTypeSchema =
  SchemaFactory.createForClass(NotificationType);
