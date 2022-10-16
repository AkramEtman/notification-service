import { NotificationSubscriptionDomainModel } from '../../models/notificationSubscription';

export const NotificationSubscriptionStub = (
  data: any = {},
): NotificationSubscriptionDomainModel => {
  const id = data.id || '3001';
  const typeId = data.typeId || '789654';
  const active = data.active || true;
  const resourceId = data.resourceId || '4001';
  const resourceName = data.resourceName || 'company';

  return new NotificationSubscriptionDomainModel(
    id,
    typeId,
    active,
    resourceId,
    resourceName,
  );
};
