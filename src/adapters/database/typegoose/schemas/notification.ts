import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { NotificationChannelTypeEnum } from 'src/core/notifications/notifications.contants';

export type NotificationDocument = Notification & Document;

@Schema()
export class Notification {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NotificationType',
    required: true,
  })
  typeId: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: () => String,
    enum: Object.values(NotificationChannelTypeEnum),
    required: true,
  })
  channel: NotificationChannelTypeEnum;

  @Prop({ type: () => String, required: true })
  userId: string;

  @Prop({ type: () => String, required: true })
  companyId: string;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
