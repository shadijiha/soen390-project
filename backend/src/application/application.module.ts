import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Job } from '../models/job.entity'
import { Skill } from '../models/skill.entity'
import { User } from '../models/user.entity'
import { JobsService } from '../jobs/jobs.service'
import { UsersService } from '../users/users.service'
import { ApplicationService } from './application.service'
import { ApplicationController } from './application.controller'
import { Application } from '../models/application.entity'

@Module({
  controllers: [ApplicationController],
  providers: [ApplicationService, UsersService, JobsService],
  imports: [TypeOrmModule.forFeature([User, Job, Skill, Application])],
  exports: [TypeOrmModule]
})
export class ApplicationModule {}
