import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Job } from '../models/job.entity'
import { Skill } from '../models/skill.entity'
import { Repository } from 'typeorm'
import { type Jobs } from './jobs.types'
import { User } from 'src/models/user.entity'

@Injectable()
export class JobsService {
  constructor (
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Job)
    private readonly jobsRepository: Repository<Job>,
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>
  ) {}

  async createJob (data: Jobs.AddJobRequest, recruiter: User): Promise<void> {
    const job = new Job()
    job.jobTitle = data.jobTitle
    job.companyName = data.companyName
    job.location = data.location
    job.jobDescription = data.jobDescription
    job.salary = data.salary
    job.jobType = data.jobType
    job.startDate = data.startDate
    job.coverLetter = data.coverLetter
    job.transcript = data.transcript

    if (data.skills != null) {
      if (data.skills === '' || data.skills === ' ') {
        job.skills = []
      } else {
        const skills: Skill[] = []
        data.skills
          .split(',')
          .filter((s) => s !== '')
          .forEach((s: string, i: number): void => {
            skills[i] = new Skill()
            skills[i].title = s.trim()
          })

        const existingSkills = await this.skillRepository.find({
          where: skills.map((s) => ({ title: s.title }))
        })

        const newSkills = skills.filter((s) => existingSkills.find((es) => es.title === s.title) == null)

        job.skills = [...existingSkills, ...newSkills]
      }
    }

    recruiter.jobs = [...recruiter.jobs, job]

    await this.usersRepository.save(recruiter)
  }

  async updateJob (jobId: number, data: Jobs.UpdateJobRequest, recruiter: User): Promise<void> {
    const found = recruiter.jobs.find((job) => job.id === jobId)

    if (found == null) {
      throw new NotFoundException()
    }

    const job: Job = found

    if (data.skills != null) {
      if (data.skills === '' || data.skills === ' ') {
        job.skills = []
      } else {
        const skills: Skill[] = []
        data.skills
          .split(',')
          .filter((s) => s !== '')
          .forEach((s: string, i: number): void => {
            skills[i] = new Skill()
            skills[i].title = s.trim()
          })

        const existingSkills = await this.skillRepository.find({
          where: skills.map((s) => ({ title: s.title }))
        })

        const newSkills = skills.filter((s) => existingSkills.find((es) => es.title === s.title) == null)

        job.skills = [...existingSkills, ...newSkills]
      }

      await this.jobsRepository.save(job)
    }
    const { skills, ...dataNoSkills } = data

    await this.jobsRepository.update(jobId, dataNoSkills)
  }

  async deleteJob (jobId: number, recruiter: User): Promise<void> {
    const found = recruiter.jobs.find((job) => job.id === jobId)

    if (found == null) {
      throw new NotFoundException()
    }

    await this.jobsRepository.delete(found.id)
  }

  async getAllJobs (): Promise<Job[]> {
    return await this.jobsRepository.find({
      relations: ['recruiter', 'skills']
    })
  }
}
