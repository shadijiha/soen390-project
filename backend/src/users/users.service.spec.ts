import { Test, type TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { User } from '../models/user.entity'
import { dataSourceMockFactory } from '../util/mockDataSource'
import { DataSource, DeleteResult, type Repository } from 'typeorm'
import { UsersService } from './users.service'
import * as argon2 from 'argon2'

describe('UsersService', () => {
  let service: UsersService
  let userRepository: Repository<User>
  const mockUser: User = new User()
  mockUser.id = 1
  mockUser.email = 'test@gmail.com'
  mockUser.password = '123'
  mockUser.firstName = 'test'
  mockUser.lastName = 'test'
  mockUser.gender = 'male'
  const updatedUser: User = new User()
  updatedUser.email = 'updated@gmail.com'
  const deletedResult: DeleteResult = new DeleteResult()
  deletedResult.affected = 1
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          // define a fake repository that returns the fake users
          useValue: {
            find: () => [],
            findOneBy: () => mockUser,
            findOne: () => mockUser,
            save: () => mockUser,
            update: () => updatedUser,
            delete: () => deletedResult,
            softRemove: () => null
          }
        },
        { provide: DataSource, useFactory: dataSourceMockFactory }
      ]
    }).compile()
    service = module.get<UsersService>(UsersService)
    userRepository = module.get(getRepositoryToken(User))
  })
  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should return all users', async () => {
    const allUsers = await service.findAll()
    expect(allUsers.length).toEqual(0)
  })

  it('should return a user by id', async () => {
    const user = await service.findOneById(1)
    expect(user.id).toEqual(1)
  })

  it('should return a user by email', async () => {
    const result = await service.getByEmail('test@gmail.com')
    expect(result.email).toEqual('test@gmail.com')
  })
  it('should return a user by email', async () => {
    const result = await service.findOneByEmail('test@gmail.com')
    expect(result.email).toEqual('test@gmail.com')
  })

  it('should return created user', async () => {
    const result = await service.create(mockUser)
    expect(result.email).toEqual('test@gmail.com')
  })

  it('should return updated user', async () => {
    const result = await service.update(1, updatedUser)
    expect(result.email).toEqual('test@gmail.com')
  })

  // remove user
  it('should deleted user', async () => {
    const result = await service.removeSoft(1)
    expect(result).toEqual(undefined)
  })
})
