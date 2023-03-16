import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../models/user.entity'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { Connection } from '../models/connection.entity'
import { ConnectionsController } from './connections/connections.controller'
import { ConnectionsService } from './connections/connections.service'
import { NotificationsController } from './notifications/notifications.controller'
import { NotificationsService } from './notifications/notifications.service'
import { PusherService } from '../util/pusher/pusher.service'
import { Job } from '../models/job.entity'

@Module({
  controllers: [UsersController, ConnectionsController, NotificationsController],
  providers: [UsersService, ConnectionsService, NotificationsService, PusherService],
  imports: [TypeOrmModule.forFeature([User, Job]), TypeOrmModule.forFeature([Connection])],
  exports: [TypeOrmModule]
})
export class UsersModule {}
