import {
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus
} from '@nestjs/common'
import { UseGuards } from '@nestjs/common/decorators'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { type User } from '../models/user.entity'
import { UsersService } from './users.service'
import { Users } from './users.types'
import { AuthUser, BearerPayload } from '../util/util'

@Controller('users')
@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor (private readonly usersService: UsersService) { }

  @Get()
  @ApiResponse({ type: Users.GetAllUsersResponse })
  async findAll (): Promise<User[]> {
    return await this.usersService.findAll()
  }

  @Delete()
  async remove (@AuthUser() authedUser: BearerPayload): Promise<void> {
    try {
      await this.usersService.removeSoft(authedUser.id); return
    } catch (e) {
      throw new HttpException(
        'Failed to delete user \n' + (e as Error).message,
        HttpStatus.PRECONDITION_FAILED
      )
    }
  }
}
