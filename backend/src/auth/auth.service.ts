import { Injectable } from '@nestjs/common'
import { UnauthorizedException } from '@nestjs/common/exceptions'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import * as argon2 from 'argon2'
import { Repository } from 'typeorm'
import { User } from '../models/user.entity'
import { type Auth } from './auth.types'

@Injectable()
export class AuthService {
  constructor (
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

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
  public async login ({ email, password }: Auth.LoginRequest): Promise<{ user: User, access_token: string }> {
    // Validate email
    let user: User
    try {
      user = await this.usersRepository.findOneByOrFail({ email })
    } catch (e) {
      throw new UnauthorizedException(`Email ${email} is invalid`)
    }

    // validate password
    if ((await this.validateUser(email, password)) != null) {
      const payload = {
        email,
        id: user.id
      }

      return {
        user,
        access_token: this.jwtService.sign(payload)
      }
    } else {
      throw new UnauthorizedException('Wrong password for ' + email)
    }
  }
}
