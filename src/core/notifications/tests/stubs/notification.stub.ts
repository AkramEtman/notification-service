import { SendNotificationDto } from 'src/core/notifications/dto/notifications.dto';
import { NotificationDomainModel } from '../../models/notifications';
import {
  NotificationTypeEnum,
  NotificationChannelTypeEnum,
} from '../../notifications.contants';

export const NotificationStub = (data: any = {}): NotificationDomainModel[] => {
  const id = data.id || '3001';
  const type = data.type || NotificationTypeEnum.HAPPY_BRITHDAY;
  const channel = data.channel || NotificationChannelTypeEnum.EMAIL;
  const userId = data.userId || '4001';
  const companyId = data.companyId || '5001';

  return [new NotificationDomainModel(id, type, channel, userId, companyId)];
};

export const SendNotificationDtoStub = (
  data: any = {},
): SendNotificationDto => {
  return {
    companyId: data.companyId || '507f191e810c19729de860ea',
    userId: data.userId || '507f191e810c19729de111ea',
    notificationType:
      data.notificationType || NotificationTypeEnum.HAPPY_BRITHDAY,
  };
};
