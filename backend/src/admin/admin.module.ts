import { Module } from '@nestjs/common'
import { AdminService } from './admin.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Reported } from 'src/models/reported.entity'
import { Message } from 'src/models/message.entity'
import { Post } from 'src/models/post.entity'
import { AdminController } from './admin.controller'
import { User } from '../models/user.entity'
import { PusherService } from '../util/pusher/pusher.service'

@Module({
  providers: [AdminService, PusherService],
  controllers: [AdminController],
  imports: [TypeOrmModule.forFeature([Reported, Post, Message, User])]
})
export class AdminModule {}
