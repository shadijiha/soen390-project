import { Body, Controller, Get, Post, UseGuards, Res, HttpStatus } from '@nestjs/common'
import { ConflictException, UnauthorizedException } from '@nestjs/common/exceptions'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'
import { User } from '../models/user.entity'
import { UsersService } from '../users/users.service'
import { AuthUser, BearerPayload } from '../util/util'
import { AuthService } from './auth.service'
import { Auth } from './auth.types'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { Response } from 'express'

export class TokenDto {
  token: string
}

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor (
    private readonly userService: UsersService,
    private readonly authService: AuthService
  ) { }

  // login endpoint for user
  @Post('login')
  // @UseGuards(LocalAuthGuard)
  @ApiResponse({ type: User })
  public async login (@Body() body: Auth.LoginRequest, @Res({ passthrough: true }) res): Promise<User> {
    // try {
    return await this.authService.login(body)
      .then(({ user, accessToken }) => {
        res.cookie('accessToken', accessToken, {
          expires: new Date(new Date().getTime() + 1 * 24 * 60 * 1000),
          sameSite: 'lax',
          httpOnly: true
        })

        return user as User
      })
    // } catch (e) {
    // 	return error<Auth.LoginResponse>(e);
    // }
  }

  // register and then login endpoint for user
  @Post('register')
  @ApiResponse({ type: User })
  public async register (@Body() body: Auth.RegisterRequest, @Res({ passthrough: true }) res): Promise<User> {
    try {
      // Will fail if email is NOT taken
      await this.userService.findOneByEmail(body.email)
    } catch (e) {
      await this.userService.create(body)
      this.authService.login(body)
        .then(({ user, accessToken }) => {
          res.cookie('accessToken', accessToken, {
            expires: new Date(new Date().getTime() + 1 * 24 * 60 * 1000),
            sameSite: 'lax',
            httpOnly: true
          })

          return user as User
        })
        .catch(() => {
          throw new UnauthorizedException(`Email ${body.email} is invalid`)
        })
    }

    // If we are here this means that email is taken since we did not return from the try block
    throw new ConflictException(`Email ${body.email} already taken`)
  }

  @Post('google/redirect')
  // @UseGuards(AuthGuard('google'))
  async googleAuthRedirect (@Body() tokenDto: TokenDto, @Res({ passthrough: true }) res): Promise<User> {
    const { token } = tokenDto
    return await this.authService.googleLogin(token)
      .then(({ user, accessToken }) => {
        res.cookie('accessToken', accessToken, {
          expires: new Date(new Date().getTime() + 1 * 24 * 60 * 1000),
          sameSite: 'lax',
          httpOnly: true
        })

        return user as User
      })
  }

  // get user info endpoint
  @Get('me')
  @ApiResponse({ type: User })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  public async me (@AuthUser() authedUser: BearerPayload): Promise<User> {
    const user: User = (await authedUser.getUser([
      'educations',
      'workExperiences',
      'volunteeringExperience',
      'skills',
      'recommendationsReceived',
      'recommendationsGiven',
      'courses',
      'projects',
      'awards',
      'languages'
    ])) as User

    return user
  }

  // logout endpoint for user
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('logout')
  public logout (@Res({ passthrough: true }) res: Response): any {
    res.status(HttpStatus.OK).clearCookie('accessToken')
  }
}
