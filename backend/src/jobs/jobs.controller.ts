import { Body, Controller, Delete, Get, HttpException, Param, Post, Put, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { type Job } from '../models/job.entity'
import { type Recruiter } from '../models/user_types/recruiter.entity'
import { AuthUser, BearerPayload } from '../util/util'
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

  // get all jobs listings for a recruiter
  @Get()
  async getJobs (@AuthUser() authedUser: BearerPayload): Promise<Job[]> {
    const recruiter: Recruiter = (await authedUser.getUser(['jobs'])) as Recruiter
    if (recruiter == null) {
      throw new HttpException('Recruiters does not exist', 400)
    }

    if (recruiter.type !== 'recruiter') throw new HttpException('Only recruiters can have job posts', 400)

    return recruiter.jobs
  }

  // update job post
  @Put(':id')
  async updateJob (@AuthUser() authedUser: BearerPayload, @Body() job: Jobs.UpdateJobRequest, @Param('id') id: string): Promise<void> {
    const recruiter: Recruiter = (await authedUser.getUser(['jobs'])) as Recruiter
    if (recruiter == null) {
      return
    }

    if (recruiter.type !== 'recruiter') throw new HttpException('Only recruiters can update job posts', 400)
    await this.usersService.updateJob(parseInt(id), job, recruiter)
  }

  @Delete(':id')
  async deleteJob (@AuthUser() authedUser: BearerPayload, @Param('id') id: string): Promise<void> {
    const recruiter: Recruiter = (await authedUser.getUser(['jobs'])) as Recruiter
    if (recruiter == null) {
      return
    }

    if (recruiter.type !== 'recruiter') throw new HttpException('Only recruiters can delete job posts', 400)
    await this.usersService.deleteJob(parseInt(id), recruiter)
  }
}
