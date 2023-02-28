import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Job } from 'src/models/job.entity'
import { Skill } from 'src/models/skill.entity'
import { Recruiter } from 'src/models/user_types/recruiter.entity'
import { Repository } from 'typeorm'
import { type Jobs } from './jobs.types'

@Injectable()
export class JobsService {
  constructor (
    @InjectRepository(Recruiter)
    private readonly recruiterRepository: Repository<Recruiter>,
    @InjectRepository(Job)
    private readonly jobsRepository: Repository<Job>
  ) {}

  async createJob (data: Jobs.AddJobRequest, recruiter: Recruiter): Promise<void> {
    const job = new Job()
    job.jobTitle = data.jobTitle
    job.companyName = data.companyName
    job.location = data.location
    job.jobDescription = data.jobDescription
    job.salary = data.salary
    job.jobType = data.jobType
    job.startDate = data.startDate

    const skills: Skill[] = []
    data.skills
      .split(',')
      .filter((s) => s !== '')
      .forEach((s: string, i: number): void => {
        skills[i] = new Skill()
        skills[i].title = s
      })

    if (skills.length === 0) return

    job.skills = [...skills]

    recruiter.jobs = [...recruiter.jobs, job]

    await this.recruiterRepository.save(recruiter)
  }
}
