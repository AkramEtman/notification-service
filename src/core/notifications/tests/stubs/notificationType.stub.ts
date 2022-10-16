import { NotificationTypeDomainModel } from '../../models/notificationType';
import {
  NotificationChannelTypeEnum,
  NotificationTypeEnum,
} from '../../notifications.contants';

export const NotificationTypeStub = (
  data: any = {},
): NotificationTypeDomainModel => {
  const id = data.id || '3001';
  const name = data.name || NotificationTypeEnum.HAPPY_BRITHDAY.toString();
  const channels = data.channels || [NotificationChannelTypeEnum.EMAIL];

  return new NotificationTypeDomainModel(id, name, channels);
};
