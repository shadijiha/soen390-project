import { ConflictException, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test, type TestingModule } from '@nestjs/testing'
import { DataSource, type Repository } from 'typeorm'
import { User } from '../models/user.entity'
import { setupTestDB } from '../util/testUtil'
import { AuthController } from './auth.controller'
import { UsersModule } from '../users/users.module'
import { getRepositoryToken } from '@nestjs/typeorm'
import { UsersService } from '../users/users.service'
import { dataSourceMockFactory } from '../util/mockDataSource'
import { AuthService } from './auth.service'

describe('AuthController', () => {
  let controller: AuthController
  let userRepository: Repository<User>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...setupTestDB(), UsersModule],
      providers: [
        UsersService,
        AuthService,
        JwtService,
        {
          provide: getRepositoryToken(User),
          useValue: {}
        },
        { provide: DataSource, useFactory: dataSourceMockFactory }
      ],
      controllers: [AuthController]
    }).compile()

    controller = module.get<AuthController>(AuthController)
    userRepository = module.get(getRepositoryToken(User))
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  // Test the register
  const emailToTest = `test${Math.floor(Math.random() * 10e9)}@test.com`
  it('should register and return the user', async () => {
    const registerResult = await controller.register({
      email: emailToTest,
      firstName: 'First name sample',
      lastName: 'Last name sample',
      gender: 'female',
      password: 'hehexd'
    })

    expect(registerResult).toHaveProperty('user.email', emailToTest)
  })

  // Test the register with the same email
  it('should raise an email already exists error', async () => {
    expect(
      await controller.register({
        email: emailToTest,
        firstName: 'First name sample',
        lastName: 'Last name sample',
        gender: 'female',
        password: 'hehexd'
      })
    ).toThrow(ConflictException)
  })

  // Test logging in with wong password
  it('should throw UnauthorizedException error', async () => {
    expect(
      await controller.login({
        email: emailToTest,
        password: 'wrong_password'
      })
    ).toThrow(UnauthorizedException)
  })

  // Test logging in with non existing email
  it('should throw UnauthorizedException error', async () => {
    const notExistingEmail = `test${Math.floor(Math.random() * 10e12)}@test.com`
    expect(
      await controller.login({
        email: notExistingEmail,
        password: 'hehexd'
      })
    ).toThrow(UnauthorizedException)
  })

  // Login with correct email, password
  it('should login and return user and access token', async () => {
    expect(
      await controller.login({
        email: emailToTest,
        password: 'hehexd'
      })
    ).toHaveProperty('user.email', emailToTest)
  })

  // Check /me
  it('should return a user', async () => {
    expect(
      await controller.me({
        email: emailToTest,
        id: (await userRepository.findOne({
          where: { email: emailToTest }
        }))!.id
      })
    ).toHaveProperty('user.email', emailToTest)
  })

  it('should throw an error', async () => {
    expect(await controller.me({ email: '', id: -1 })).toThrowError()
  })

  afterAll(async () => {
    ;(
      await userRepository.findOne({
        where: { email: emailToTest }
      })
    )?.remove()
  })
})
