import { Injectable } from '@nestjs/common'
import { UnauthorizedException } from '@nestjs/common/exceptions'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import * as argon2 from 'argon2'
import { Repository } from 'typeorm'
import { User } from '../models/user.entity'
import { type Auth } from './auth.types'
import { UsersService } from '../users/users.service'

@Injectable()
export class AuthService {
  constructor (
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) { }

  // validates user email vs password
  public async validateUser (email: string, pass: string): Promise<Partial<User> | null> {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .select('user.password')
      .addSelect('user')
      .where('email = :email', {
        email
      })
      .getOne()

    // TODO: implement Argon encryption
    if (user != null && (await argon2.verify(user.password, pass))) {
      const { password, ...result } = user // Remove password from user object (we don't want to return it)
      return result
    }
    return null
  }

  // logins user
  public async login ({ email, password }: Auth.LoginRequest): Promise<Auth.LoginResponse> {
    // Validate email
    let user: User
    console.log(email, password)
    try {
      user = await this.usersRepository.findOneByOrFail({ email })
    } catch (e) {
      throw new UnauthorizedException(`Email ${email} is invalid`)
    }

    // if user is banned throw error
    if (user.type === 'banned') {
      throw new UnauthorizedException(`User ${email} is banned`)
    }

    // validate password
    if ((await this.validateUser(email, password)) != null) {
      const payload = {
        email,
        id: user.id
      }

      return {
        user,
        accessToken: this.jwtService.sign(payload)
      }
    } else {
      throw new UnauthorizedException('Wrong password for ' + email)
    }
  }

  async googleLogin (token: any): Promise<Auth.LoginResponse> {
    const decodedJwtAccessToken: Auth.GoogleToken = this.jwtService.decode(token) as Auth.GoogleToken
    const payload = {
      email: decodedJwtAccessToken?.email,
      sub: decodedJwtAccessToken?.sub,
      firstName: decodedJwtAccessToken?.given_name,
      lastName: decodedJwtAccessToken?.family_name,
      picture: decodedJwtAccessToken?.picture
    }
    return await this.usersRepository.findOneByOrFail({ email: payload.email })
      .then((user: User) => {
        const { password, ...userNoPass } = user
        const payload = {
          email: userNoPass.email,
          id: userNoPass.id
        }
        return {
          user: userNoPass,
          accessToken: this.jwtService.sign(payload)
        }
      })
      .catch(async () => {
        const newUser: Auth.RegisterRequest = new User()
        newUser.email = payload.email
        newUser.firstName = payload.firstName
        newUser.lastName = payload.lastName
        newUser.gender = 'male' // temp
        newUser.password = await argon2.hash('temp1234qa')

        try {
          const { password, ...userNoPass } = await this.userService.create(newUser)
          const payload = {
            email: userNoPass.email,
            id: userNoPass.id
          }
          return {
            user: userNoPass,
            accessToken: this.jwtService.sign(payload)
          }
        } catch (error) {
          console.log('google auth error', error)
          throw new UnauthorizedException('Authentication error: Google SSO, could not create user')
        }
      })
  }
}
