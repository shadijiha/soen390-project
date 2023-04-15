import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../models/user.entity'
import { PusherService } from '../util/pusher/pusher.service'
import { ConnectionsService } from '../users/connections/connections.service'
import { UsersModule } from '../users/users.module'
import { UsersService } from '../users/users.service'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt.strategy'
import { GoogleStrategy } from './google.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: process.env.APP_SECRET,
          signOptions: { expiresIn: '24h' }
        }
      },
      inject: [ConfigService]
    }),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, UsersService, JwtStrategy, ConnectionsService, PusherService]
})
export class AuthModule { }
