import { IsIn, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { NotificationTypeEnum } from 'src/core/notifications/notifications.contants';

export class SendNotificationApiDto {
  @ApiProperty({ default: '3001', type: String })
  @IsString()
  companyId: string;

  @ApiProperty({ default: '1001', type: String })
  @IsString()
  userId: string;

  @ApiProperty({
    default: NotificationTypeEnum.HAPPY_BRITHDAY,
    enum: NotificationTypeEnum,
  })
  @IsIn(Object.values(NotificationTypeEnum))
  notificationType: NotificationTypeEnum;
}
