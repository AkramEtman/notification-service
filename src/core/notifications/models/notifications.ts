import { NotificationChannelTypeEnum } from '../notifications.contants';

export class NotificationDomainModel {
  private readonly id: string;
  private readonly typeId: string;
  private readonly channel: NotificationChannelTypeEnum;
  private readonly userId: string;
  private readonly companyId: string;

  constructor(
    id: string,
    typeId: string,
    channel: NotificationChannelTypeEnum,
    userId: string,
    companyId: string,
  ) {
    this.id = id;
    this.typeId = typeId;
    this.channel = channel;
    this.userId = userId;
    this.companyId = companyId;
  }
}
