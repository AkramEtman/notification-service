import { Test, TestingModule } from '@nestjs/testing';
import { SendNotificationDto } from '../../dto/notifications.dto';
import { NotificationsRepositoryMock } from '../mocks/notification.repository.mock';
import { NotificationsRepository } from '../../../ports/notification.repository';
import { SendNotificationDtoStub } from '../stubs/notification.stub';
import { NotificationSubscriptionService } from '../../services/notificationSubscription.service';
import { NotificationSubscriptionStub } from '../stubs/notificationSubscription.stub';

describe('NotificationSubscriptionService', () => {
  let notificationSubscriptionService: NotificationSubscriptionService;
  let notificationsRepository: NotificationsRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationSubscriptionService,
        {
          provide: 'NotificationsRepository',
          useValue: NotificationsRepositoryMock,
        },
      ],
    }).compile();
    notificationSubscriptionService =
      module.get<NotificationSubscriptionService>(
        NotificationSubscriptionService,
      );
    notificationsRepository = module.get<NotificationsRepository>(
      'NotificationsRepository',
    );
    jest.clearAllMocks();
  });

  it('should defined', () => {
    expect(notificationSubscriptionService).toBeDefined();
  });

  describe('isNotificationSubscribed', () => {
    let sendNotificationDto: SendNotificationDto;

    describe('check calling functions', () => {
      beforeEach(async () => {
        sendNotificationDto = SendNotificationDtoStub();
        notificationSubscriptionService.getCompanyNotificationSubscription =
          jest.fn().mockResolvedValue(true);
        notificationSubscriptionService.getUserNotificationSubscription = jest
          .fn()
          .mockResolvedValue(true);

        await notificationSubscriptionService.isNotificationSubscribed(
          sendNotificationDto,
        );
      });

      it('should call getCompanyNotificationSubscription', () => {
        expect(
          notificationSubscriptionService.getCompanyNotificationSubscription,
        ).toBeCalledWith(sendNotificationDto.companyId);
      });

      it('should call getUserNotificationSubscription', () => {
        expect(
          notificationSubscriptionService.getUserNotificationSubscription,
        ).toBeCalledWith(sendNotificationDto.userId);
        expect(
          notificationSubscriptionService.getUserNotificationSubscription,
        ).toBeCalledWith(sendNotificationDto.userId);
      });
    });

    describe('check return values', () => {
      let res: boolean;
      describe('when company subscription is true and user subscription is true', () => {
        beforeEach(async () => {
          sendNotificationDto = SendNotificationDtoStub();
          notificationSubscriptionService.getCompanyNotificationSubscription =
            jest.fn().mockResolvedValue(true);
          notificationSubscriptionService.getUserNotificationSubscription = jest
            .fn()
            .mockResolvedValue(true);

          res = await notificationSubscriptionService.isNotificationSubscribed(
            sendNotificationDto,
          );
        });

        it('should return true', () => {
          expect(res).toBe(true);
        });
      });

      describe('when company subscription is true and user subscription is false', () => {
        beforeEach(async () => {
          sendNotificationDto = SendNotificationDtoStub();
          notificationSubscriptionService.getCompanyNotificationSubscription =
            jest.fn().mockResolvedValue(true);
          notificationSubscriptionService.getUserNotificationSubscription = jest
            .fn()
            .mockResolvedValue(false);

          res = await notificationSubscriptionService.isNotificationSubscribed(
            sendNotificationDto,
          );
        });

        it('should return false', () => {
          expect(res).toBe(false);
        });
      });

      describe('when company subscription is false and user subscription is true', () => {
        beforeEach(async () => {
          sendNotificationDto = SendNotificationDtoStub();
          notificationSubscriptionService.getCompanyNotificationSubscription =
            jest.fn().mockResolvedValue(false);
          notificationSubscriptionService.getUserNotificationSubscription = jest
            .fn()
            .mockResolvedValue(true);

          res = await notificationSubscriptionService.isNotificationSubscribed(
            sendNotificationDto,
          );
        });

        it('should return false', () => {
          expect(res).toBe(false);
        });
      });

      describe('when company subscription is false and user subscription is false', () => {
        beforeEach(async () => {
          sendNotificationDto = SendNotificationDtoStub();
          notificationSubscriptionService.getCompanyNotificationSubscription =
            jest.fn().mockResolvedValue(false);
          notificationSubscriptionService.getUserNotificationSubscription = jest
            .fn()
            .mockResolvedValue(false);

          res = await notificationSubscriptionService.isNotificationSubscribed(
            sendNotificationDto,
          );
        });

        it('should return false', () => {
          expect(res).toBe(false);
        });
      });
    });
  });

  describe('getCompanyNotificationSubscription', () => {
    let res: boolean;
    const companyId = '507f191e810c19729de860ea';

    describe('call correct functions', () => {
      beforeEach(async () => {
        notificationsRepository.getNotificationSubscription = jest.fn();
        await notificationSubscriptionService.getCompanyNotificationSubscription(
          companyId,
        );
      });

      it('should be call NotificationsRepository getNotificationSubscription with correct parameters', () => {
        expect(
          notificationsRepository.getNotificationSubscription,
        ).toBeCalledWith('company', companyId);
      });
    });

    describe('when companyId is found in DB', () => {
      beforeEach(async () => {
        notificationsRepository.getNotificationSubscription = jest
          .fn()
          .mockResolvedValue(NotificationSubscriptionStub());
        res =
          await notificationSubscriptionService.getCompanyNotificationSubscription(
            companyId,
          );
      });

      it('should return true', () => {
        expect(res).toEqual(true);
      });
    });

    describe('when companyId is not found in DB', () => {
      beforeEach(async () => {
        notificationsRepository.getNotificationSubscription = jest
          .fn()
          .mockResolvedValue(null);
        res =
          await notificationSubscriptionService.getCompanyNotificationSubscription(
            companyId,
          );
      });

      it('should return false', () => {
        expect(res).toEqual(false);
      });
    });
  });

  describe('getUserNotificationSubscription', () => {
    let res: boolean;
    const userId = '507f191e810c19729de860ea';

    describe('call correct functions', () => {
      beforeEach(async () => {
        notificationsRepository.getNotificationSubscription = jest.fn();
        await notificationSubscriptionService.getUserNotificationSubscription(
          userId,
        );
      });

      it('should be call NotificationsRepository getNotificationSubscription with correct parameters', () => {
        expect(
          notificationsRepository.getNotificationSubscription,
        ).toBeCalledWith('user', userId);
      });
    });

    describe('when userId is found in DB', () => {
      beforeEach(async () => {
        notificationsRepository.getNotificationSubscription = jest
          .fn()
          .mockResolvedValue(NotificationSubscriptionStub());
        res =
          await notificationSubscriptionService.getUserNotificationSubscription(
            userId,
          );
      });

      it('should return true', () => {
        expect(res).toEqual(true);
      });
    });

    describe('when userId is not found in DB', () => {
      beforeEach(async () => {
        notificationsRepository.getNotificationSubscription = jest
          .fn()
          .mockResolvedValue(null);
        res =
          await notificationSubscriptionService.getUserNotificationSubscription(
            userId,
          );
      });

      it('should return false', () => {
        expect(res).toEqual(false);
      });
    });
  });
});
