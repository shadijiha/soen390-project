import { Controller } from '@nestjs/common/decorators/core/controller.decorator'
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator'
import { Get, Post } from '@nestjs/common/decorators/http/request-mapping.decorator'
import { ApiBearerAuth } from '@nestjs/swagger/dist/decorators/api-bearer.decorator'
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator'
import { PusherService } from '../../util/pusher/pusher.service'
import { JwtAuthGuard } from '../../auth/jwt-auth.guard'
import { AuthUser, BearerPayload } from '../../util/util'
import { NotificationsService } from './notifications.service'
import { Param } from '@nestjs/common'
import { type Notifications } from 'src/models/notifications.entity'

@Controller('notifications')
@ApiTags('Notifications')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor (private readonly notificationsService: NotificationsService, private readonly pusherService: PusherService) {}

  /**
   * It sends a notification to the client
   */
  // @Post("/notifications")
  // async sendNotification(@AuthUser() userInfo: BearerPayload): Promise<void> {
  //   await this.pusherService.triggerNotification("my-channel", "my-event", {
  //     message: "Hello, world!",
  //   });
  // }

  // get all notifications
  @Get('/notifications/all')
  async getNotifications (@AuthUser() userInfo: BearerPayload): Promise<Notifications[]> {
    return await this.notificationsService.getAllNotifications(userInfo.id)
  }

  // get unread notifications
  @Get('/notifications/unread')
  async getUnreadNotifications (@AuthUser() userInfo: BearerPayload): Promise<Notifications[]> {
    return await this.notificationsService.getUnreadNotifications(userInfo.id)
  }

  // mark notification as read
  @Post('/notifications/read/:notificationId')
  async markAsRead (@AuthUser() userInfo: BearerPayload, @Param('notificationId') notificationId: number): Promise<void> {
    console.log(notificationId)
    await this.notificationsService.markAsRead(userInfo.id, notificationId)
  }

  // mark all notifications as read
  @Post('/notifications/read/all')
  async markAllAsRead (@AuthUser() userInfo: BearerPayload): Promise<void> {
    await this.notificationsService.markAllAsRead(userInfo.id)
  }

  // delete notification
  @Post('/notifications/delete/:notificationId')
  async deleteNotification (@AuthUser() userInfo: BearerPayload, @Param('notificationId') notificationId: number): Promise<void> {
    await this.notificationsService.deleteNotification(userInfo.id, notificationId)
  }
}
