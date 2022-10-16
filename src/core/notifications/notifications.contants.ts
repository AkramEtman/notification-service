import { EmailNotification } from './channels/email';
import { UINotification } from './channels/ui';

export type NotificationSubscriptionResource = 'user' | 'company';

export enum NotificationChannelTypeEnum {
  UI = 'ui',
  EMAIL = 'email',
}

export const NotificationChannelModelEnum = {
  [NotificationChannelTypeEnum.UI]: UINotification,
  [NotificationChannelTypeEnum.EMAIL]: EmailNotification,
};

export enum NotificationTypeEnum {
  LEAVE_BALANCE_REMINDER = 'leave-balance-reminder',
  MONTHLY_PAYSLIP = 'monthly-payslip',
  HAPPY_BRITHDAY = 'happy-birthday',
}
