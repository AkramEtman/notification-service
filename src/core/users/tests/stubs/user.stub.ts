import { User } from '../../user.entity';

export const UserStub = (data: any = {}): User => {
  return {
    id: data.id || '1001',
    firstName: data.firstName || 'akram',
    lastName: data.lastName || 'Etman',
    email: data.email || 'akrametman@gmail.com',
    companyId: data.companyId || '2001',
  };
};

export const UserWithCompanyStub = (data: any = {}) => {
  return {
    id: data.id || '1001',
    firstName: data.firstName || 'akram',
    lastName: data.lastName || 'Etman',
    email: data.email || 'akrametman@gmail.com',
    company: {
      id: data.company?.id || '2001',
      name: data.company?.name || 'company company',
    },
  };
};
