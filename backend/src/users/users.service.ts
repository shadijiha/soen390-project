import { Injectable } from '@nestjs/common'
import { User } from '../models/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Like, Repository } from 'typeorm'
import { type Users } from './users.types'
import * as argon2 from 'argon2'
import { type Auth } from '../auth/auth.types'
import { Job } from '../models/job.entity'
import type * as Pusher from 'pusher'
import { PusherService } from '../util/pusher/pusher.service'

@Injectable()
export class UsersService {
  constructor (
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Job)
    private readonly jobsRepository: Repository<Job>,
    private readonly dataSource: DataSource,
    private readonly pusherService: PusherService
  ) {
  }

  /**
   * It returns a user from the database by email
   * @param {string} email - string
   * @returns The user object
   */
  public async getByEmail (email: string): Promise<User> {
    return await this.usersRepository.findOneByOrFail({ email })
  }

  /**
   * It returns an array of users.
   * @returns An array of users
   */
  async findAll (): Promise<User[]> {
    return await this.usersRepository.find()
  }

  /**
   * It finds a user by their id and returns the user with all of their relations.
   * @param {number} userId - number - the id of the user we want to find
   * @param {string[]} [relations] - [
   * @returns The user object with all the relations.
   */
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

  /**
   * "Find a user by their id, and return the user if found, otherwise throw an error."
   * @param {number} userId - number - the id of the user you want to find
   * @returns A user object with all the relations.
   */
  async findOneByIdNoRelations (userId: number): Promise<User> {
    const user: User = await this.usersRepository.findOneOrFail({
      where: {
        id: userId
      }
    })
    return user
  }

  /**
   * Find a user by email, or throw an error if not found.
   * @param {string} email - string
   * @returns The user object
   */
  async findOneByEmail (email: string): Promise<User | null> {
    return await this.usersRepository.findOneByOrFail({ email })
  }

  /**
   * It creates a new user, hashes the password, and saves the user to the database.
   * @param body - Auth.RegisterRequest
   * @returns The userNoPass is being returned.
   */
  public async create (body: Auth.RegisterRequest): Promise<Partial<User>> {
    const user = new User()
    user.email = body.email
    user.password = await argon2.hash(body.password)
    user.firstName = body.firstName
    user.lastName = body.lastName
    user.gender = body.gender

    const { password, ...userNoPass }: Partial<User> = await this.usersRepository.save(user)
    return userNoPass
  }

  /**
   * It updates a user object.
   * @param {number} id - number - the id of the user to be updated
   * @param user - Users.UpdateUserRequest
   * @param files - { profilePic?: Express.Multer.File; coverPic?: Express.Multer.File }
   * @returns The updated user.
   */
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

  /**
   * It updates the user's status in the database and then triggers a Pusher event to update the user's
   * status in the frontend
   * @param {number} id - The id of the user whose status is being updated.
   * @param {"online" | "offline"} status - "online" | "offline"
   * @returns The response from the Pusher API.
   */
  async updateStatus (id: number, status: 'online' | 'offline'): Promise<Pusher.Response> {
    const oldUser = await this.findOneByIdNoRelations(id)
    oldUser.userStatus = status
    await this.usersRepository.update(id, oldUser)

    return await this.pusherService.trigger(`userStatus-${id}`, 'statusUpdate', { id, status })
  }

  /**
   * This function returns a promise that resolves to either the string "online" or the string "offline"
   * depending on the user's status.
   * @param {number} id - number - the id of the user
   * @returns The userStatus property of the user object.
   */
  async getStatus (id: number): Promise<'online' | 'offline'> {
    const user = await this.findOneByIdNoRelations(id)
    return user.userStatus
  }

  /**
   * Find a user by id, then soft remove it.
   * @param {number} id - number - the id of the user to be deleted
   */
  async removeSoft (id: number): Promise<void> {
    const user = await this.findOneById(id)
    await this.usersRepository.softRemove(user)
  }

  /**
   * It returns a promise that resolves to an object with two properties, users and jobs, where users is
   * an array of users and jobs is an array of jobs.
   * The function takes two arguments, user
   * @param {User | null} user - User | null - The user that is currently logged in.
   * @param {string} query - string - The search query
   * @returns An object with two properties: users and jobs.
   */
  public async search (user: User | null, query: string): Promise<Users.SearchResponse> {
    return {
      users: await this.usersRepository.find({
        where: [{ firstName: Like(`%${query}%`) }, { lastName: Like(`%${query}%`) }, { email: Like(`%${query}%`) }],
        take: 10
      }),
      jobs: await this.jobsRepository.find({
        where: [{ jobTitle: Like(`%${query}%`) }, { companyName: Like(`%${query}%`) }, { location: Like(`%${query}%`) }],
        take: 10
      })
    }
  }

  /**
   * It takes a user and files, and if the files have a cv or cover letter, it converts the buffer to
   * base64 and saves it to the user.
   * @param {User} user - User - the user object that is being updated
   * @param files - { cv?: Express.Multer.File; coverLetter?: Express.Multer.File }
   */
  async addDocuments (user: User, files: { cv?: Express.Multer.File, coverLetter?: Express.Multer.File }): Promise<void> {
    if (files?.cv != null) {
      const buff = files.cv[0].buffer
      const base64data = buff.toString('base64')
      user.cv = base64data
    }

    if (files?.coverLetter != null) {
      const buff = files.coverLetter[0].buffer
      const base64data = buff.toString('base64')
      user.coverLetter = base64data
    }

    await this.usersRepository.save(user)
  }

  /**
   * It removes documents from a user's profile.
   * @param {User} user - User - this is the user that is currently logged in
   * @param data - Users.DeleteDocumentsRequest
   */
  async removeDocuments (user: User, data: Users.DeleteDocumentsRequest): Promise<void> {
    if (data.cv) {
      user.cv = null
    }

    if (data.coverLetter) {
      user.coverLetter = null
    }

    await this.usersRepository.save(user)
  }

  /**
   * It finds a user by id, sets the profilePic property to null, and saves the user.
   * @param {number} userId - number - The id of the user whose profile picture you want to remove.
   */
  async removeProfilePic (userId: number): Promise<void> {
    const user = await this.usersRepository.findOneOrFail({
      where: {
        id: userId
      }
    })
    user.profilePic = null
    await this.usersRepository.save(user)
  }

  /**
   * It finds a user by id, sets the coverPic property to null, and saves the user.
   * @param {number} userId - number - the id of the user whose cover pic you want to remove
   */
  async removeCoverPic (userId: number): Promise<void> {
    const user = await this.usersRepository.findOneOrFail({
      where: {
        id: userId
      }
    })
    user.coverPic = null
    await this.usersRepository.save(user)
  }
}
