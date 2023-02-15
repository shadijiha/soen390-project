import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../models/user.entity";
import { ConnectionsController } from './connections/connections.controller';
import { ConnectionsService } from './connections/connections.service';
import { Connection } from "src/models/connection.entity";
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
  controllers: [UsersController, ConnectionsController],
  providers: [UsersService, ConnectionsService],
  imports: [TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([Connection])],
  exports: [TypeOrmModule],
})
export class UsersModule {}
