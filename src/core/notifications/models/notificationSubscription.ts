import { NotificationSubscriptionResource } from '../notifications.contants';

export class NotificationSubscriptionDomainModel {
  private readonly id: string;
  private readonly typeId: string;
  private readonly active: boolean;
  private readonly resourceName: NotificationSubscriptionResource;
  private readonly resourceId: string;

  constructor(
    id: string,
    typeId: string,
    active: boolean,
    resourceId: string,
    resourceName: NotificationSubscriptionResource,
  ) {
    this.id = id;
    this.typeId = typeId;
    this.active = active;
    this.resourceId = resourceId;
    this.resourceName = resourceName;
  }

  isSubscribed(): boolean {
    return this.active;
  }
}
