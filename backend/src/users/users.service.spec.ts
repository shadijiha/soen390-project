import { Test, type TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { User } from '../models/user.entity'
import { dataSourceMockFactory } from '../util/mockDataSource'
import { DataSource, DeleteResult, type Repository } from 'typeorm'
import { UsersService } from './users.service'
import { Users } from './users.types'

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
  const updatedUser = new Users.UpdateUserRequest()
  updatedUser.email = 'updated@gmail.com'
  const deletedResult: DeleteResult = new DeleteResult()
  deletedResult.affected = 1
  let mockUsersRepository = {
    find: jest.fn(() => []),
    findOneBy: jest.fn(() => mockUser),
    findOneByOrFail: jest.fn(() => mockUser),
    findOneOrFail: jest.fn(() => mockUser),
    findOne: jest.fn(() => mockUser),
    save: jest.fn(() => mockUser),
    update: jest.fn(() => updatedUser),
    delete: jest.fn(() => deletedResult),
    softRemove: jest.fn( () => null)

  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          // define a fake repository that returns the fake users
          useValue: mockUsersRepository
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
    expect(result?.email).toEqual('test@gmail.com')
  })

  it('should return created user', async () => {
    const result = await service.create(mockUser)
    expect(result.email).toEqual('test@gmail.com')
  })

  it('should return updated user', async () => {
    const result = await service.update(1, updatedUser, {profilePic: undefined, coverPic: undefined} )
    expect(result.email).toEqual('updated@gmail.com')
  })

  // remove user
  it('should soft delete user', async () => {
    const result = await service.removeSoft(1)
    expect(mockUsersRepository.softRemove).toHaveBeenCalled()
  })

  it('should return search results', async () => {
    const result = await service.search(null , 'test');
    expect(mockUsersRepository.find).toHaveBeenCalled()
  })
})
