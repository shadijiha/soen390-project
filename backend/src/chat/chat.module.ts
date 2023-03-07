import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Message } from 'src/models/message.entity'
import { ChatController } from './chat.controller'
import { ChatService } from './chat.service'

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  controllers: [ChatController],
  providers: [ChatService]
})
export class ChatModule {}
