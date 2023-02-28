import { Module } from '@nestjs/common'
import { JobsService } from './jobs.service'
import { JobsController } from './jobs.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Job } from 'src/models/job.entity'
import { Recruiter } from 'src/models/user_types/recruiter.entity'
import { Skill } from 'src/models/skill.entity'
import { UsersService } from 'src/users/users.service'
import { UsersController } from 'src/users/users.controller'

@Module({
  providers: [JobsService],
  controllers: [JobsController],
  imports: [TypeOrmModule.forFeature([Job, Recruiter, Skill])]
})
export class JobsModule {}
