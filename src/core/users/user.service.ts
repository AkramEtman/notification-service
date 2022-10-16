import { Injectable } from '@nestjs/common';
import { NotificationTypeEnum } from '../notifications/notifications.contants';
import { UserStub, UserWithCompanyStub } from './tests/stubs/user.stub';

@Injectable()
export class UsersService {
  getUser(userId: string) {
    return UserStub();
  }
  getUserDataForNotificationType(notificationType: NotificationTypeEnum) {
    return UserWithCompanyStub();
  }

  getActivatedCompaniesForNotification(
    notificationType: NotificationTypeEnum,
  ): string[] {
    return ['3001', '3002', '3003', '3004', '3005'];
  }

  getUsersByComapanies(
    compainesIds: string[],
  ): { userId: string; companyId: string }[] {
    return [
      { userId: '1001', companyId: '3001' },
      { userId: '1002', companyId: '3002' },
      { userId: '1003', companyId: '3003' },
    ];
  }
}
