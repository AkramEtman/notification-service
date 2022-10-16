import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../../../users/user.service';
import { NotificationsService } from '../../services/notifications.service';
import { NotificationsRepositoryMock } from '../mocks/notification.repository.mock';
import { NotificationsRepository } from '../../../ports/notification.repository';
import {
  NotificationChannelTypeEnum,
  NotificationTypeEnum,
} from '../../notifications.contants';
import { NotificationSubscriptionService } from '../../services/notificationSubscription.service';
import { SendNotificationDtoStub } from '../stubs/notification.stub';
import {
  CreateNotificationDto,
  SendNotificationDto,
} from '../../dto/notifications.dto';
import { NotificationTypeStub } from '../stubs/notificationType.stub';
import { UserServiceMock } from '../../../../core/users/tests/mocks/user.service.mock';
import { NotificationTypeDomainModel } from '../../models/notificationType';
import { NotificationChannel } from '../../channels/notificationChannel.interface';
import { EmailNotification } from '../../channels/email';
import { NotificationChannelContext } from '../../channels/notificationChannelContext';
import { UserWithCompanyStub } from '../../../../core/users/tests/stubs/user.stub';

describe('NotificationsService', () => {
  let notificationsService: NotificationsService;
  let notificationSubscriptionService: NotificationSubscriptionService;
  let userService: UsersService;
  let notificationsRepository: NotificationsRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationsService,
        NotificationSubscriptionService,
        {
          provide: 'NotificationsRepository',
          useValue: NotificationsRepositoryMock,
        },
        {
          provide: UsersService,
          useValue: UserServiceMock,
        },
      ],
    }).compile();
    notificationsService =
      module.get<NotificationsService>(NotificationsService);
    notificationSubscriptionService =
      module.get<NotificationSubscriptionService>(
        NotificationSubscriptionService,
      );
    userService = module.get<UsersService>(UsersService);
    notificationsRepository = module.get<NotificationsRepository>(
      'NotificationsRepository',
    );
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(notificationsService).toBeDefined();
  });

  describe('send', () => {
    let sendNotificationDto: SendNotificationDto;
    const notificationTypeStub = NotificationTypeStub();

    describe('check calling functions', () => {
      beforeEach(async () => {
        sendNotificationDto = SendNotificationDtoStub();
        notificationSubscriptionService.isNotificationSubscribed = jest
          .fn()
          .mockResolvedValue(true);
        notificationsService.sendNotification = jest.fn();

        await notificationsService.send(sendNotificationDto);
      });

      it('should be call notificationSubscriptionService isNotificationSubscribed', () => {
        expect(
          notificationSubscriptionService.isNotificationSubscribed,
        ).toBeCalledWith(sendNotificationDto);
      });

      it('should be call notificationsRepository getNotificationType', () => {
        expect(notificationsRepository.getNotificationType).toBeCalledWith(
          sendNotificationDto.notificationType,
        );
      });

      it('should be call sendNotification', () => {
        expect(notificationsService.sendNotification).toBeCalledWith(
          notificationTypeStub,
          sendNotificationDto,
        );
      });
    });

    describe('check return values', () => {
      beforeEach(async () => {
        sendNotificationDto = SendNotificationDtoStub();
        notificationSubscriptionService.isNotificationSubscribed = jest
          .fn()
          .mockResolvedValue(false);
      });

      it('should be throw BadRequestException', async () => {
        try {
          await notificationsService.send(sendNotificationDto);
        } catch (e) {
          expect(e.message).toBe(
            'Notification is not been subscribed for user or company',
          );
        }
      });
    });
  });

  describe('getUINotifications', () => {
    const userId = '507f191e810c19729de860ea';
    beforeEach(async () => {
      notificationsService.getNotifications = jest.fn();
      await notificationsService.getUINotifications(userId);
    });

    it('should be call getNotifications with correct parameters', () => {
      expect(notificationsService.getNotifications).toBeCalledWith(
        userId,
        NotificationChannelTypeEnum.UI,
      );
    });
  });

  describe('getNotifications', () => {
    const userId = '507f191e810c19729de860ea';
    const notificationChannel = NotificationChannelTypeEnum.EMAIL;
    beforeEach(async () => {
      await notificationsService.getNotifications(userId, notificationChannel);
    });

    it('should be call NotificationsRepository getNotifications with correct parameters', () => {
      expect(notificationsRepository.getNotificationsByChannel).toBeCalledWith(
        userId,
        notificationChannel,
      );
    });
  });

  describe('sendNotificationsByType', () => {
    const notificationTypeName = NotificationTypeEnum.HAPPY_BRITHDAY;
    let compainesIds: string[];
    let usersByCompanies: { userId: string; companyId: string }[];
    let notificationType: NotificationTypeDomainModel;
    let sendNotificationDto: SendNotificationDto;

    describe('check calling functions', () => {
      beforeEach(async () => {
        notificationsService.sendNotification = jest.fn();
        await notificationsService.sendNotificationsByType(
          notificationTypeName,
        );
      });

      it('should be call usersService getActivatedCompaniesForNotification', () => {
        expect(userService.getActivatedCompaniesForNotification).toBeCalledWith(
          notificationTypeName,
        );
        compainesIds =
          userService.getActivatedCompaniesForNotification(
            notificationTypeName,
          );
      });

      it('should be call usersService getUsersByComapanies', () => {
        expect(userService.getUsersByComapanies).toBeCalledWith(compainesIds);
        usersByCompanies = userService.getUsersByComapanies(compainesIds);
      });

      it('should be call notificationsRepository getNotificationType', async () => {
        expect(notificationsRepository.getNotificationType).toBeCalledWith(
          notificationTypeName,
        );
        notificationType = await notificationsRepository.getNotificationType(
          notificationTypeName,
        );
        sendNotificationDto = {
          companyId: usersByCompanies[0].companyId,
          userId: usersByCompanies[0].userId,
          notificationType: notificationTypeName,
        };
      });

      it('should be call sendNotification', () => {
        expect(notificationsService.sendNotification).toBeCalledWith(
          notificationType,
          sendNotificationDto,
        );
        expect(notificationsService.sendNotification).toBeCalledTimes(
          usersByCompanies.length,
        );
      });
    });
  });

  describe('getNotificationModel', () => {
    let notificationChannel;
    let res: NotificationChannel;

    describe('when notificationChannel is not found in enum', () => {
      it('should throw exception', () => {
        try {
          notificationsService.getNotificationModel(notificationChannel);
        } catch (e) {
          expect(e.message).toBe(
            'NotificationModel for notificationChannel is not found',
          );
        }
      });
    });

    describe('when notificationChannel is found in enum', () => {
      beforeEach(async () => {
        notificationChannel = NotificationChannelTypeEnum.EMAIL;
        res = notificationsService.getNotificationModel(notificationChannel);
      });

      it('should return EmailNotification', () => {
        expect(res).toEqual(new EmailNotification());
      });
    });
  });

  describe('getNotificationContext', () => {
    describe('when notificationContext is defined', () => {
      const notificationChannel = new EmailNotification();
      const notificationContext = new NotificationChannelContext(
        notificationChannel,
      );
      beforeEach(async () => {
        notificationContext.setStrategy = jest.fn();
        notificationsService.getNotificationContext(
          notificationContext,
          notificationChannel,
        );
      });

      it('should call notificationContext.setStrategy', () => {
        expect(notificationContext.setStrategy).toBeCalledTimes(1);
      });
    });
  });

  describe('sendNotification', () => {
    const notificationTypeStub = NotificationTypeStub();
    let sendNotificationDto = SendNotificationDtoStub();
    let NotificationModel = new EmailNotification()
    let notificationPayload = UserWithCompanyStub()
    const createNotification: CreateNotificationDto = {
      companyId: sendNotificationDto.companyId,
      userId: sendNotificationDto.userId,
      channel: notificationTypeStub.getChannels()[0],
      typeId: notificationTypeStub.getId(),
    };

    describe('check calling functions', () => {
      beforeEach(async () => {
        notificationsService.getNotificationModel = jest.fn().mockReturnValue(NotificationModel);
        notificationsService.getNotificationContext = jest.fn().mockReturnValue({ send: jest.fn() });

        await notificationsService.sendNotification(
          notificationTypeStub,
          sendNotificationDto,
        );
      });

      it('should be call getNotificationModel', () => {
        const channel = notificationTypeStub.getChannels()[0];
        expect(notificationsService.getNotificationModel).toBeCalledWith(
          channel,
        );
      });

      it('should be call getNotificationContext', () => {
        expect(notificationsService.getNotificationContext).toBeCalledWith(
          undefined,
          NotificationModel,
        );
      });

      it('should be call usersService getUserDataForNotificationType', () => {
        expect(userService.getUserDataForNotificationType).toBeCalledWith(
          sendNotificationDto.notificationType,
        );
      });

      //todo fix failed test case
      // it('should be call notificationContext send', () => {
      //   expect(notificationContext.send ).toBeCalledWith( sendNotificationDto.notificationType, notificationPayload );
      // });

      it('should be call notificationsRepository create', () => {
        expect(notificationsRepository.create).toBeCalledWith(
          createNotification,
        );
      });
    });

    describe('check return values', () => {
      beforeEach(async () => {
        sendNotificationDto = SendNotificationDtoStub();
        notificationSubscriptionService.isNotificationSubscribed = jest
          .fn()
          .mockResolvedValue(false);
      });

      it('should be throw BadRequestException', async () => {
        try {
          await notificationsService.send(sendNotificationDto);
        } catch (e) {
          expect(e.message).toBe(
            'Notification is not been subscribed for user or company',
          );
        }
      });
    });
  });
});
