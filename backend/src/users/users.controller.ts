import { Controller, Delete, Get, HttpException, HttpStatus } from '@nestjs/common'
import { Body, Param, Put, Query, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common/decorators'
import { ApiBearerAuth, ApiConsumes, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { type User } from '../models/user.entity'
import { UsersService } from './users.service'
import { Users } from './users.types'
import { AuthUser, BearerPayload } from '../util/util'
import { FileFieldsInterceptor } from '@nestjs/platform-express'
import { FileValidationPipe } from '../util/fileValidationPipe'

@Controller()
@Controller()
@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor (private readonly usersService: UsersService) { }

  @Get('users')
  @ApiResponse({ type: Users.GetAllUsersResponse })
  async findAll (): Promise<User[]> {
    return await this.usersService.findAll()
  }

  @Get('user/:id')
  @ApiResponse({ type: Users.GetAllUsersResponse })
  async findOne (@Param('id') id: number): Promise<User> {
    try {
      return await this.usersService.findOneById(id)
    } catch (e) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
  }

  @Delete('user')
  async remove (@AuthUser() authedUser: BearerPayload): Promise<void> {
    try {
      await this.usersService.removeSoft(authedUser.id)
    } catch (e) {
      throw new HttpException('Failed to delete user \n' + (e as Error).message, HttpStatus.PRECONDITION_FAILED)
    }
  }

  @Get('search')
  @ApiQuery({ name: 'query', required: true })
  public async search (@AuthUser() authedUser: BearerPayload, @Query('query') query: string): Promise<Users.SearchResponse> {
    if (query.length <= 0) return { users: [], companies: [] }
    return await this.usersService.search(await authedUser.getUser(), query)
  }

  @Put('user')
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ type: Users.UpdateUserResponse })
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'profilePic', maxCount: 1 },
      { name: 'coverPic', maxCount: 1 }
    ])
  )
  async update (
    @AuthUser() authedUser: BearerPayload,
      @Body() user: Users.UpdateUserRequest,
      @UploadedFiles(FileValidationPipe) files: { profilePic?: Express.Multer.File, coverPic?: Express.Multer.File }
  ): Promise<User> {
    console.log(files)
    return await this.usersService.update(authedUser.id, user, files)
  }
}
