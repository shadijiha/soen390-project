import { Body, Controller, HttpException, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { type Recruiter } from 'src/models/user_types/recruiter.entity'
import { AuthUser, BearerPayload } from 'src/util/util'
import { JobsService } from './jobs.service'
import { Jobs } from './jobs.types'

@Controller('jobs')
@ApiTags('jobs')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class JobsController {
  constructor (private readonly usersService: JobsService) {}

  // create a job post only allowed if user is a recruiter
  @Post()
  async createJob (@AuthUser() authedUser: BearerPayload, @Body() job: Jobs.AddJobRequest): Promise<void> {
    const recruiter: Recruiter = (await authedUser.getUser(['jobs'])) as Recruiter
    if (recruiter == null) {
      return
    }

    if (recruiter.type !== 'recruiter') throw new HttpException('Only recruiters can create job posts', 400)

    await this.usersService.createJob(job, recruiter)
  }
}
