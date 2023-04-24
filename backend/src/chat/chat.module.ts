import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Job } from '../models/job.entity'
import { User } from '../models/user.entity'
import { UsersService } from '../users/users.service'
import { Message } from '../models/message.entity'
import { ChatController } from './chat.controller'
import { ChatService } from './chat.service'
import { UploadedFileDB } from '../models/file.entity'
import { PusherService } from 'src/util/pusher/pusher.service'
import { ShadoCloudClient } from 'shado-cloud-sdk'

@Module({
  imports: [TypeOrmModule.forFeature([Message, User, Job, UploadedFileDB])],
  controllers: [ChatController],
  providers: [ChatService, UsersService, PusherService, ShadoCloudClient]
})
export class ChatModule {}
