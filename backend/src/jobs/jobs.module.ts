import { Module } from '@nestjs/common'
import { JobsService } from './jobs.service'
import { JobsController } from './jobs.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Job } from '../models/job.entity'
import { Skill } from '../models/skill.entity'
import { User } from '../models/user.entity'
import { NotificationsService } from '../users/notifications/notifications.service'
import { Notifications } from '../models/notifications.entity'
import { PusherService } from '../util/pusher/pusher.service'

@Module({
  providers: [JobsService, NotificationsService, PusherService],
  controllers: [JobsController],
  imports: [TypeOrmModule.forFeature([Job, User, Skill, Notifications])]
})
export class JobsModule {}
