import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { NotificationSubscriptionResource } from 'src/core/notifications/notifications.contants';
import mongoose, { Document } from 'mongoose';

export type NotificationSubscriptionDocument = NotificationSubscription &
  Document;

@Schema({
  autoIndex: true,
})
export class NotificationSubscription {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NotificationType',
    required: true,
  })
  type: mongoose.Schema.Types.ObjectId;

  @Prop({ type: () => String, required: true })
  resourceName: NotificationSubscriptionResource;

  @Prop({ type: () => String, required: true })
  resourceId: mongoose.Schema.Types.ObjectId;

  @Prop({ type: () => Boolean, required: true })
  active: boolean;
}
export const NotificationSubscriptionSchema = SchemaFactory.createForClass(
  NotificationSubscription,
);
NotificationSubscriptionSchema.index(
  { resourceName: 1, resourceId: 1, type: 1 },
  { unique: true },
);
