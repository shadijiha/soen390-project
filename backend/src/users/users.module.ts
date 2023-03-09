import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../models/user.entity'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { Connection } from '../models/connection.entity'
import { ConnectionsController } from './connections/connections.controller'
import { ConnectionsService } from './connections/connections.service'
import { Job } from '../models/job.entity'

@Module({
  controllers: [UsersController, ConnectionsController],
  providers: [UsersService, ConnectionsService],
  imports: [TypeOrmModule.forFeature([User, Job]), TypeOrmModule.forFeature([Connection])],
  exports: [TypeOrmModule]
})
export class UsersModule {}
