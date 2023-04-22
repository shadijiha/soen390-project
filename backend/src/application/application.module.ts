import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Job } from '../models/job.entity'
import { Skill } from '../models/skill.entity'
import { User } from '../models/user.entity'
import { JobsService } from '../jobs/jobs.service'
import { UsersService } from '../users/users.service'
import { ApplicationService } from './application.service'
import { ApplicationController } from './application.controller'
import { Application } from '../models/application.entity'
import { PusherService } from '../util/pusher/pusher.service'
import { NotificationsService } from '../users/notifications/notifications.service'
import { Notifications } from '../models/notifications.entity'

@Module({
  controllers: [ApplicationController],
  providers: [ApplicationService, PusherService, UsersService, JobsService, NotificationsService],
  imports: [TypeOrmModule.forFeature([User, Job, Skill, Application, Notifications])],
  exports: [TypeOrmModule]
})
export class ApplicationModule {}
