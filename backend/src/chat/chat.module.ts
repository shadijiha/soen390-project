import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'src/models/user.entity'
import { UsersService } from 'src/users/users.service'
import { Message } from '../models/message.entity'
import { ChatController } from './chat.controller'
import { ChatService } from './chat.service'

@Module({
  imports: [TypeOrmModule.forFeature([Message, User])],
  controllers: [ChatController],
  providers: [ChatService, UsersService]
})
export class ChatModule {}
