import { Module } from '@nestjs/common'
import { JobsService } from './jobs.service'
import { JobsController } from './jobs.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Job } from '../models/job.entity'
import { Recruiter } from '../models/user_types/recruiter.entity'
import { Skill } from '../models/skill.entity'

@Module({
  providers: [JobsService],
  controllers: [JobsController],
  imports: [TypeOrmModule.forFeature([Job, Recruiter, Skill])]
})
export class JobsModule {}
