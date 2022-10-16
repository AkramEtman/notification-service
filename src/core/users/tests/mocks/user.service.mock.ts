import { UsersService } from '../../user.service';
import { UserStub, UserWithCompanyStub } from '../stubs/user.stub';

export const UserServiceMock: UsersService = {
  getUser: jest.fn().mockReturnValue(UserStub()),
  getActivatedCompaniesForNotification: jest.fn().mockReturnValue(['3001']),
  getUserDataForNotificationType: jest
    .fn()
    .mockReturnValue(UserWithCompanyStub()),
  getUsersByComapanies: jest
    .fn()
    .mockReturnValue([{ userId: '1001', companyId: '3001' }]),
};
