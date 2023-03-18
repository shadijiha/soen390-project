import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Application } from 'src/models/application.entity'
import { Job } from 'src/models/job.entity'
import { type User } from 'src/models/user.entity'
import { Repository } from 'typeorm'
import { type Applications } from './application.types'

@Injectable()
export class ApplicationService {
  constructor (
    @InjectRepository(Job)
    private readonly jobsRepository: Repository<Job>,
    @InjectRepository(Application)
    private readonly applicationRepository: Repository<Application>
  ) {}

  async postApplication (
    jobId: number,
    user: User,
    application: Applications.AddApplicationRequest,
    files: { cv?: Express.Multer.File, coverLetter?: Express.Multer.File }
  ): Promise<void> {
    const job = await this.jobsRepository.findOneOrFail({
      where: {
        id: jobId
      },
      relations: ['applications', 'user']
    })

    if (job == null) {
      throw new NotFoundException('Job not found')
    }

    if (job.user.id === user.id) {
      throw new BadRequestException('You cannot apply to your own job')
    }

    const app = new Application()
    app.name = application.name
    app.email = application.email
    app.phone = application.phone
    app.user = user

    // convert pdf to base64
    if (files?.cv != null) {
      const buff = files.cv[0].buffer
      const base64data = buff.toString('base64')
      app.cv = base64data
    }

    // convert pdf to base64
    if (files?.coverLetter != null) {
      const buff = files.coverLetter[0].buffer
      const base64data = buff.toString('base64')
      app.coverLetter = base64data
    }

    job.applications = [...job.applications, app]
    await this.jobsRepository.save(job)
  }

  async deleteApplication (applicationId: number, user: User): Promise<void> {
    const found = user.applications.find((application) => application.id === applicationId)

    if (found == null) {
      throw new NotFoundException()
    }

    await this.applicationRepository.delete(found.id)
  }

  async getMyApplications (user: User): Promise<Application[]> {
    const applications = await this.applicationRepository.find({
      where: {
        user: { id: user.id }
      },
      relations: ['job']
    })

    return applications
  }
}
