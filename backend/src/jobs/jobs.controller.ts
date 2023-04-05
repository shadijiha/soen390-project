import { Body, Controller, Delete, Get, HttpException, Param, Post, Put, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { type User } from '../models/user.entity'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { type Job } from '../models/job.entity'
import { AuthUser, BearerPayload } from '../util/util'
import { JobsService } from './jobs.service'
import { Jobs } from './jobs.types'

@Controller('jobs')
@ApiTags('Jobs')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class JobsController {
  constructor (private readonly jobsService: JobsService) {}

  // create a job post only allowed if user is a recruiter
  @Post()
  async createJob (@AuthUser() authedUser: BearerPayload, @Body() job: Jobs.AddJobRequest): Promise<void> {
    const recruiter: User = (await authedUser.getUser(['jobs'])) as User

    if (recruiter == null) {
      return
    }

    await this.jobsService.createJob(job, recruiter)
  }

  // get all job listings
  @Get('/all')
  async getAllJobs (@AuthUser() authedUser: BearerPayload): Promise<Job[]> {
    return await this.jobsService.getAllJobs()
  }

  // get a job listing by id
  @Get(':id')
  async getJobById (@Param('id') id: string): Promise<Job> {
    try {
      return await this.jobsService.getJobById(parseInt(id))
    } catch (e) {
      throw new HttpException('Job does not exist', 400)
    }
  }

  // get all jobs listings for a recruiter
  @Get('/my')
  async getJobs (@AuthUser() authedUser: BearerPayload): Promise<Job[]> {
    const recruiter: User = (await authedUser.getUser(['jobs'])) as User

    if (recruiter == null) {
      throw new HttpException('Recruiters does not exist', 400)
    }

    return recruiter.jobs
  }

  // get applications for my job listing
  @Get('/my/applications')
  async getApplicationsForMyJobs (@AuthUser() authedUser: BearerPayload): Promise<Job[]> {
    const recruiter: User = (await authedUser.getUser()) as User
    return await this.jobsService.getApplicationsForMyJobs(recruiter.id)
  }

  // update job post
  @Put(':id')
  async updateJob (@AuthUser() authedUser: BearerPayload, @Body() job: Jobs.UpdateJobRequest, @Param('id') id: string): Promise<void> {
    const recruiter: User = (await authedUser.getUser(['jobs'])) as User
    if (recruiter == null) {
      return
    }

    await this.jobsService.updateJob(parseInt(id), job, recruiter)
  }

  // delete job post
  @Delete(':id')
  async deleteJob (@AuthUser() authedUser: BearerPayload, @Param('id') id: string): Promise<void> {
    const recruiter: User = (await authedUser.getUser(['jobs'])) as User
    if (recruiter == null) {
      return
    }

    await this.jobsService.deleteJob(parseInt(id), recruiter)
  }
}
