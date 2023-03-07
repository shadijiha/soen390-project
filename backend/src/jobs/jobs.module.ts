import { Module } from '@nestjs/common'
import { JobsService } from './jobs.service'
import { JobsController } from './jobs.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Job } from '../models/job.entity'
import { Recruiter } from '../models/user_types/recruiter.entity'
import { Skill } from '../models/skill.entity'
import { User } from '../models/user.entity'

@Module({
  providers: [JobsService],
  controllers: [JobsController],
  imports: [TypeOrmModule.forFeature([Job, User, Skill])]
})
export class JobsModule {}
