import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { ConflictException } from '@nestjs/common/exceptions'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ConnectionsService } from '../users/connections/connections.service'
import { User } from '../models/user.entity'
import { UsersService } from '../users/users.service'
import { AuthUser, BearerPayload } from '../util/util'
import { AuthService } from './auth.service'
import { Auth } from './auth.types'
import { JwtAuthGuard } from './jwt-auth.guard'

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor (
    private readonly userService: UsersService,
    private readonly authService: AuthService,
    private readonly connectionsService: ConnectionsService
  ) {}

  // login endpoint for user
  @Post('login')
  @ApiResponse({ type: Auth.LoginResponse })
  public async login (@Body() body: Auth.LoginRequest): Promise<Auth.LoginResponse> {
    return await this.authService.login(body)
  }

  // register and then login endpoint for user
  @Post('register')
  @ApiResponse({ type: Auth.LoginResponse })
  public async register (@Body() body: Auth.RegisterRequest): Promise<Auth.LoginResponse> {
    try {
      // Will fail if email is NOT taken
      await this.userService.findOneByEmail(body.email)
    } catch (e) {
      await this.userService.create(body)
      return await this.authService.login(body)
      // from security point we should not tell to a user that this email was taken already. Message should tell there was an error but not that this email is alrady in the database. Kinda aan easy wau for the hackers.
    }

    // If we are here this means that email is taken since we did not return from the try block
    throw new ConflictException(`Email ${body.email} already taken`)
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
}
