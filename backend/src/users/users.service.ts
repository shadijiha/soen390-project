import { Injectable } from '@nestjs/common'
import { User } from '../models/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Like, Repository } from 'typeorm'
import { type Users } from './users.types'
import * as argon2 from 'argon2'
import { type Auth } from '../auth/auth.types'
import { Job } from '../models/job.entity'

@Injectable()
export class UsersService {
  constructor (
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Job)
    private readonly jobsRepository: Repository<Job>,
    private readonly dataSource: DataSource
  ) {}

  public async getByEmail (email: string): Promise<User> {
    return await this.usersRepository.findOneByOrFail({ email })
  }

  async findAll (): Promise<User[]> {
    return await this.usersRepository.find()
  }

  async findOneById (userId: number, relations?: string[]): Promise<User> {
    const user: User = await this.usersRepository.findOneOrFail({
      where: {
        id: userId
      },
      relations: [
        'educations',
        'workExperiences',
        'volunteeringExperience',
        'skills',
        'courses',
        'projects',
        'awards',
        'languages',
        'recommendationsReceived'
      ]
    })

    return user
  }

  async findOneByIdNoRelations (userId: number): Promise<User> {
    const user: User = await this.usersRepository.findOneOrFail({
      where: {
        id: userId
      }
    })
    return user
  }

  async findOneByEmail (email: string): Promise<User | null> {
    return await this.usersRepository.findOneByOrFail({ email })
  }

  public async create (body: Auth.RegisterRequest): Promise<Record<string, any>> {
    const user = new User()
    user.email = body.email
    user.password = await argon2.hash(body.password)
    user.firstName = body.firstName
    user.lastName = body.lastName
    user.gender = body.gender

    const { password, ...userNoPass }: Record<string, any> = await this.usersRepository.save(user)
    return userNoPass
  }

  async update (
    id: number,
    user: Users.UpdateUserRequest,
    files: { profilePic?: Express.Multer.File, coverPic?: Express.Multer.File }
  ): Promise<User> {
    const oldUser = await this.findOneByIdNoRelations(id)

    oldUser.firstName = user.firstName !== '' ? user.firstName : oldUser.firstName
    oldUser.lastName = user.lastName !== '' ? user.lastName : oldUser.lastName
    oldUser.email = user.email !== '' ? user.email : oldUser.email
    oldUser.mobileNo = user.mobileNo !== '' ? user.mobileNo : oldUser.mobileNo
    oldUser.gender = user.gender !== '' ? user.gender : oldUser.gender
    oldUser.biography = user.biography !== '' ? user.biography : oldUser.biography

    // convert image to base64
    if (files?.profilePic != null) {
      const buff = files.profilePic[0].buffer
      const base64data = buff.toString('base64')
      oldUser.profilePic = base64data
    }

    // convert image to base64
    if (files?.coverPic != null) {
      const buff = files.coverPic[0].buffer
      const base64data = buff.toString('base64')
      oldUser.coverPic = base64data
    }

    await this.usersRepository.update(id, oldUser)
    return await this.findOneById(id)
  }

  async removeSoft (id: number): Promise<void> {
    const user = await this.findOneById(id)
    await this.usersRepository.softRemove(user)
  }

  public async search (user: User | null, query: string): Promise<Users.SearchResponse> {
    return {
      users: await this.usersRepository.find({
        where: [
          { firstName: Like(`%${query}%`) },
          { lastName: Like(`%${query}%`) },
          { email: Like(`%${query}%`) }],
        take: 10
      }),
      jobs: await this.jobsRepository.find({
        where: [
          { jobTitle: Like(`%${query}%`) },
          { companyName: Like(`%${query}%`) },
          { location: Like(`%${query}%`) }
        ],
        take: 10
      })
    }
  }
}
