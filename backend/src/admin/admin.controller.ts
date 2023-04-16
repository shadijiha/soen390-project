import { Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { AdminService } from './admin.service'
import { AuthUser, BearerPayload } from '../util/util'
import { type User } from '../models/user.entity'
import { type Reported } from '../models/reported.entity'

@Controller('admin')
@ApiTags('Admin')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class AdminController {
  constructor (private readonly adminService: AdminService) {}

  @Post('report-post/:id')
  async reportPost (@Param('id') postId: string, @AuthUser() authedUser: BearerPayload): Promise<void> {
    const reporter = (await authedUser.getUser()) as User
    await this.adminService.reportPost(postId, reporter)
  }

  @Post('report-message/:id')
  async reportMessage (@Param('id') messageId: string, @AuthUser() authedUser: BearerPayload): Promise<void> {
    const reporter = (await authedUser.getUser()) as User
    await this.adminService.reportMessage(messageId, reporter)
  }

  @Get('reported-posts')
  async getReportedPosts (@AuthUser() authedUser: BearerPayload): Promise<Reported[]> {
    const user = (await authedUser.getUser()) as User

    if (user.type !== 'admin') {
      throw new Error('Unauthorized, Not an admin')
    }

    return await this.adminService.getReportedPosts()
  }

  @Get('reported-messages')
  async getReportedMessages (@AuthUser() authedUser: BearerPayload): Promise<Reported[]> {
    const user = (await authedUser.getUser()) as User
    if (user.type !== 'admin') {
      throw new Error('Unauthorized, Not an admin')
    }
    return await this.adminService.getReportedMessages()
  }

  @Get('resolved-posts')
  async getResolvedPosts (@AuthUser() authedUser: BearerPayload): Promise<Reported[]> {
    const user = (await authedUser.getUser()) as User
    if (user.type !== 'admin') {
      throw new Error('Unauthorized, Not an admin')
    }
    return await this.adminService.getResolvedPosts()
  }

  @Get('resolved-messages')
  async getResolvedMessages (@AuthUser() authedUser: BearerPayload): Promise<Reported[]> {
    const user = (await authedUser.getUser()) as User
    if (user.type !== 'admin') {
      throw new Error('Unauthorized, Not an admin')
    }
    return await this.adminService.getResolvedMessages()
  }

  @Put('resolve-post/safe/:reportId')
  async resolvePost (@Param('reportId') reportId: string, @AuthUser() authedUser: BearerPayload): Promise<void> {
    const user = (await authedUser.getUser()) as User

    if (user.type !== 'admin') {
      throw new Error('Unauthorized, Not an admin')
    }
    await this.adminService.resolvePostSafe(reportId)
  }

  @Put('resolve-message/safe/:reportId')
  async resolveMessage (@Param('reportId') reportId: string, @AuthUser() authedUser: BearerPayload): Promise<void> {
    const user = (await authedUser.getUser()) as User

    if (user.type !== 'admin') {
      throw new Error('Unauthorized, Not an admin')
    }
    await this.adminService.resolveMessageSafe(reportId)
  }

  @Put('resolve-post/warned/:reportId')
  async removePost (@Param('reportId') reportId: string, @AuthUser() authedUser: BearerPayload): Promise<void> {
    const user = (await authedUser.getUser()) as User

    if (user.type !== 'admin') {
      throw new Error('Unauthorized, Not an admin')
    }
    await this.adminService.removePost(reportId)
  }

  @Put('resolve-message/warned/:reportId')
  async removeMessage (@Param('reportId') reportId: string, @AuthUser() authedUser: BearerPayload): Promise<void> {
    const user = (await authedUser.getUser()) as User

    if (user.type !== 'admin') {
      throw new Error('Unauthorized, Not an admin')
    }
    await this.adminService.removeMessage(reportId)
  }

  @Put('resolve-post/Ban/:reportId')
  async BanPost (@Param('reportId') reportId: string, @AuthUser() authedUser: BearerPayload): Promise<void> {
    const user = (await authedUser.getUser()) as User

    if (user.type !== 'admin') {
      throw new Error('Unauthorized, Not an admin')
    }
    await this.adminService.banUserPost(reportId)
  }

  @Put('resolve-message/Ban/:reportId')
  async BanMessage (@Param('reportId') reportId: string, @AuthUser() authedUser: BearerPayload): Promise<void> {
    const user = (await authedUser.getUser()) as User

    if (user.type !== 'admin') {
      throw new Error('Unauthorized, Not an admin')
    }
    await this.adminService.banUserMessage(reportId)
  }

  // unban user
  @Put('unban-user/:userId')
  async unbanUser (@Param('userId') userId: string, @AuthUser() authedUser: BearerPayload): Promise<void> {
    const user = (await authedUser.getUser()) as User

    if (user.type !== 'admin') {
      throw new Error('Unauthorized, Not an admin')
    }
    await this.adminService.unbanUser(userId)
  }
}
