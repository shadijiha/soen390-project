import { Test, type TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { dataSourceMockFactory } from '../util/mockDataSource'
import { DataSource, Repository } from 'typeorm'
import { User } from '../models/user.entity'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { createTestBearerPayload, type BearerPayload } from '../util/util'

describe('UsersController', () => {
  let controller: UsersController
  let service: UsersService
  let userRepository: Repository<User>;
  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: UsersService,
      useFactory: () => ({
        findAll: jest.fn(() => []),
        findOne: jest.fn(() => {}),
        update: jest.fn(() => {}),
        getByEmail: jest.fn(() => {}),
        remove: jest.fn(() => {})
      })
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {}
        },
        { provide: DataSource, useFactory: dataSourceMockFactory },
        ApiServiceProvider
      ],
      controllers: [UsersController]
    }).compile()
    controller = module.get<UsersController>(UsersController)
    service = module.get<UsersService>(UsersService)
    userRepository = module.get(getRepositoryToken(User))
  })
  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should return all users', async () => {
    const allUsers = await controller.findAll()
    expect(service.findAll).toHaveBeenCalled()
  })

  // it('should return logged in user', async () => {
  //   const bearer: BearerPayload = await createTestBearerPayload('test@gmail.com', userRepository)
  //   const loggedInUser = await controller.me(bearer)
  //   expect(service.getByEmail).toHaveBeenCalled
  // })

  // it('should return updated user', async () => {
  //   const bearer: BearerPayload = await createTestBearerPayload('test@gmail.com', userRepository)
  //   const body: Users.UpdateUserRequest = {
  //     firstName: 'Test',
  //     lastName: null,
  //     email: null,
  //     gender: null,
  //     mobileNo: "",
  //     biography: "",
  //     educations: [],
  //     workExperience: [],
  //     volunteeringExperience: [],
  //     connections: [],
  //     skills: [],
  //     recommendationsGiven: [],
  //     recommendationsReceived: [],
  //     courses: [],
  //     projects: [],
  //     awards: [],
  //     languages: []
  //   }
  //   const updatedUser = await controller.update(bearer, body)
  //   expect(service.update).toHaveBeenCalled
  // })

  it('should delete logged in user', async () => {
    const bearer: BearerPayload = await createTestBearerPayload('test@gmail.com', userRepository)
    const deletedUser = await controller.remove(bearer)
    expect(service.removeSoft).toHaveBeenCalled()
  })
})
