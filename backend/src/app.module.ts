import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { ProfileModule } from './profile/profile.module'
import { JobsModule } from './jobs/jobs.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ['dist/models/**/*.entity.{ts,js}'],
      synchronize: true,
      autoLoadEntities: true
    }),
    UsersModule,
    AuthModule,
    ProfileModule,
    JobsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
