import { NotificationChannelTypeEnum } from '../notifications.contants';

export class NotificationTypeDomainModel {
  private readonly id: string;
  private readonly name: string;
  private readonly channels: NotificationChannelTypeEnum[];

  constructor(
    id: string,
    name: string,
    channels: NotificationChannelTypeEnum[],
  ) {
    this.id = id;
    this.name = name;
    this.channels = channels;
  }

  getId(): string {
    return this.id;
  }

  getChannels(): NotificationChannelTypeEnum[] {
    return this.channels;
  }
}
