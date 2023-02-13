import {
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus
} from '@nestjs/common'
import { Query, UseGuards } from '@nestjs/common/decorators'
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { type User } from '../models/user.entity'
import { UsersService } from './users.service'
import { Users } from './users.types'
import { AuthUser, BearerPayload } from '../util/util'

@Controller()
@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor (private readonly usersService: UsersService) {}

  @Get('users')
  @ApiResponse({ type: Users.GetAllUsersResponse })
  async findAll (): Promise<User[]> {
    return await this.usersService.findAll()
  }

  @Delete('users')
  public async remove (@AuthUser() authedUser: BearerPayload): Promise<void> {
    try {
      await this.usersService.removeSoft(authedUser.id)
    } catch (e) {
      throw new HttpException(
        'Failed to delete user \n' + (e as Error).message,
        HttpStatus.PRECONDITION_FAILED
      )
    }
  }

  @Get('search')
  @ApiQuery({ name: 'query', required: true })
  public async search (
    @AuthUser() authedUser: BearerPayload,
      @Query('query') query: string
  ): Promise<Users.SearchResponse> {
    if (query.length <= 0) return { users: [], companies: [] }
    return await this.usersService.search(await authedUser.getUser(), query)
  }
}
