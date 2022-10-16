import { Test, TestingModule } from '@nestjs/testing';
import { EmailNotification } from '../../../../../core/notifications/channels/email';
import { EmailNotificationPayload } from '../../../../../core/notifications/dto/notifications.dto';
import { NotificationTypeEnum } from '../../../../../core/notifications/notifications.contants';
import { UserWithCompanyStub } from '../../../../../core/users/tests/stubs/user.stub';

describe('EmailNotification', () => {
  let emailNotification: EmailNotification;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailNotification],
    }).compile();
    emailNotification = module.get<EmailNotification>(EmailNotification);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(emailNotification).toBeDefined();
  });

  describe('run', () => {
    const notificationType: NotificationTypeEnum =
      NotificationTypeEnum.HAPPY_BRITHDAY;
    const notificationPayload = UserWithCompanyStub();
    let emailPayload: EmailNotificationPayload;

    describe('check calling functions', () => {
      beforeEach(async () => {
        emailNotification.buildNotifiaction = jest.fn();
        emailNotification.send = jest.fn();

        emailNotification.run(notificationType, notificationPayload);
      });

      it('should be call buildNotifiaction', () => {
        expect(emailNotification.buildNotifiaction).toBeCalledWith(
          notificationType,
          notificationPayload,
        );
        emailPayload = emailNotification.buildNotifiaction(
          notificationType,
          notificationPayload,
        );
      });

      it('should be call send', () => {
        expect(emailNotification.send).toBeCalledWith(
          notificationPayload.email,
          emailPayload,
        );
      });
    });
  });

  describe('buildNotifiaction', () => {
    const notificationType = NotificationTypeEnum.HAPPY_BRITHDAY;
    const notificationPayload = UserWithCompanyStub();
    let res: EmailNotificationPayload;

    describe('when buildNotifiaction is called', () => {
      beforeEach(() => {
        res = emailNotification.buildNotifiaction(
          notificationType,
          notificationPayload,
        );
      });

      it('should be correct subject string', () => {
        expect(res.subject).toEqual(
          `Happy Birthday ${notificationPayload.firstName}`,
        );
      });

      it('should be correct content string', () => {
        expect(res.content).toEqual(
          `${notificationPayload.company.name} is wishing you a happy birthday`,
        );
      });
    });
  });
});
