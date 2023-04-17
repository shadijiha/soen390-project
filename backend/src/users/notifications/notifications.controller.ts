import { Controller } from '@nestjs/common/decorators/core/controller.decorator'
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator'
import { Post } from '@nestjs/common/decorators/http/request-mapping.decorator'
import { ApiBearerAuth } from '@nestjs/swagger/dist/decorators/api-bearer.decorator'
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator'
import { PusherService } from '../../util/pusher/pusher.service'
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard'
import { AuthUser, BearerPayload } from '../../util/util'

@Controller('notifications')
@ApiTags('Notifications')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor (private readonly pusherService: PusherService) { }

  /**
   * It sends a notification to the client
   */
  @Post('/notifications')
  async sendNotification (@AuthUser() userInfo: BearerPayload): Promise<void> {
    await this.pusherService.triggerNotification('my-channel', 'my-event', {
      message: 'Hello, world!'
    })
  }
}
