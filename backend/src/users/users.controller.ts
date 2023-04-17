/* It's a controller that handles all the user related endpoints */
/* It's a controller that handles all the user related endpoints */
import { BadRequestException, Controller, Delete, Get, HttpException, HttpStatus } from '@nestjs/common'
import { Body, Param, Post, Put, Query, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common/decorators'
import { ApiBearerAuth, ApiConsumes, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { type User } from '../models/user.entity'
import { UsersService } from './users.service'
import { Users } from './users.types'
import { AuthUser, BearerPayload } from '../util/util'
import { FileFieldsInterceptor } from '@nestjs/platform-express'
import { ApplicationFileValidationPipe, ProfileImagesFileValidationPipe } from '../util/fileValidationPipe'
import { ConnectionsService } from './connections/connections.service'
import type Pusher from 'pusher'

@Controller()
@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor (private readonly usersService: UsersService, private readonly connectionsService: ConnectionsService) {}

  /* It's a controller that returns all users */
  @Get('users')
  @ApiResponse({ type: Users.GetAllUsersResponse })
  async findAll (): Promise<User[]> {
    return await this.usersService.findAll()
  }

  /* It's a controller that returns a user by id. */
  @Get('user/:id')
  @ApiResponse({ type: Users.GetUserByIdResponse })
  async findOne (@Param('id') id: number, @AuthUser() authedUser: BearerPayload): Promise<Users.GetUserByIdResponse> {
    try {
      const res: Users.GetUserByIdResponse = new Users.GetUserByIdResponse()
      res.user = await this.usersService.findOneById(id)
      res.connectionStatus = await this.connectionsService.getConnectionStatus(authedUser.id, id)
      res.connections = await this.connectionsService.getAcceptedConnections(res.user.id)

      return res
    } catch (e) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
  }

  /* It's a controller that deletes a user. */
  @Delete('user')
  async remove (@AuthUser() authedUser: BearerPayload): Promise<void> {
    try {
      await this.usersService.removeSoft(authedUser.id)
    } catch (e) {
      throw new HttpException('Failed to delete user \n' + (e as Error).message, HttpStatus.PRECONDITION_FAILED)
    }
  }

  /* It's a controller that returns a user or a job listing according to search query. */
  @Get('search')
  @ApiQuery({ name: 'query', required: true })
  public async search (@AuthUser() authedUser: BearerPayload, @Query('query') query: string): Promise<Users.SearchResponse> {
    if (query.length <= 0) return { users: [], jobs: [] }
    return await this.usersService.search(await authedUser.getUser(), query)
  }

  /* It's a controller that returns a suggested friends based on work and univesity. */
  @Get('suggestedFriends')
  public async suggestedFriends (@AuthUser() authedUser: BearerPayload): Promise<User[]> {
    return await this.usersService.getSuggestedFriends(authedUser.id)
  }

  /* It's a controller that updates a user. */
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
      @UploadedFiles(ProfileImagesFileValidationPipe) files: { profilePic?: Express.Multer.File, coverPic?: Express.Multer.File }
  ): Promise<User> {
    return await this.usersService.update(authedUser.id, user, files)
  }

  /* It's a controller that deletes a user's profile picture. */
  @Delete('user/profilePic')
  async removeProfilePic (@AuthUser() authedUser: BearerPayload): Promise<void> {
    await this.usersService.removeProfilePic(authedUser.id)
  }

  /* It's a controller that deletes a user's cover picture. */
  @Delete('user/coverPic')
  async removeCoverPic (@AuthUser() authedUser: BearerPayload): Promise<void> {
    await this.usersService.removeCoverPic(authedUser.id)
  }

  /* It's a controller that updates a user's status. Online/Offline */
  @Put('user/status')
  async updateStatus (@AuthUser() authedUser: BearerPayload, @Body() status: Users.UpdateStatusRequest): Promise<Pusher.Response> {
    if (status.userStatus !== 'online' && status.userStatus !== 'offline') {
      throw new BadRequestException('Invalid user status')
    }
    return await this.usersService.updateStatus(authedUser.id, status.userStatus)
  }

  /* It's a controller that returns a user's status. Online/Offline */
  @Get('user/status/:id')
  async getStatus (@AuthUser() authedUser: BearerPayload, @Param('id') id: string): Promise<'online' | 'offline'> {
    return await this.usersService.getStatus(parseInt(id))
  }

  /* It's a controller that adds a cv and/or cover letter documents. */
  @Post('user/documents')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'cv', maxCount: 1 },
      { name: 'coverLetter', maxCount: 1 }
    ])
  )
  async postDocuments (
    @AuthUser() authedUser: BearerPayload,
      @Body() data: Users.AddDocumentsRequest,
      @UploadedFiles(ApplicationFileValidationPipe) files: { cv?: Express.Multer.File, coverLetter?: Express.Multer.File }
  ): Promise<void> {
    const user = (await authedUser.getUser()) as User
    await this.usersService.addDocuments(user, files)
  }

  /* It's a controller that deletes a user's cv and/or cover letter documents. */
  @Delete('user/documents')
  async removeDocuments (@AuthUser() authedUser: BearerPayload, @Body() data: Users.DeleteDocumentsRequest): Promise<void> {
    const user = (await authedUser.getUser()) as User
    await this.usersService.removeDocuments(user, data)
  }
}
