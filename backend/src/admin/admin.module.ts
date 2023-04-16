import { Module } from '@nestjs/common'
import { AdminService } from './admin.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Reported } from 'src/models/reported.entity'
import { Message } from 'src/models/message.entity'
import { Post } from 'src/models/post.entity'
import { AdminController } from './admin.controller'
import { User } from '../models/user.entity'
import { PusherService } from '../util/pusher/pusher.service'
import { NotificationsService } from '../users/notifications/notifications.service'
import { Notifications } from '../models/notifications.entity'

@Module({
  providers: [AdminService, PusherService, NotificationsService],
  controllers: [AdminController],
  imports: [TypeOrmModule.forFeature([Reported, Post, Message, User, Notifications])]
})
export class AdminModule {}
