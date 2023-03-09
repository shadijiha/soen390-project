import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Job } from '../models/job.entity'
import { User } from '../models/user.entity'
import { UsersService } from '../users/users.service'
import { Message } from '../models/message.entity'
import { ChatController } from './chat.controller'
import { ChatService } from './chat.service'

@Module({
  imports: [TypeOrmModule.forFeature([Message, User, Job])],
  controllers: [ChatController],
  providers: [ChatService, UsersService]
})
export class ChatModule {}
