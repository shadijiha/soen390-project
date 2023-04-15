import { Module } from '@nestjs/common'
import { AdminService } from './admin.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Reported } from 'src/models/reported.entity'
import { Message } from 'src/models/message.entity'
import { Post } from 'src/models/post.entity'
import { AdminController } from './admin.controller'
import { User } from '../models/user.entity'

@Module({
  providers: [AdminService],
  controllers: [AdminController],
  imports: [TypeOrmModule.forFeature([Reported, Post, Message, User])]
})
export class AdminModule {}
