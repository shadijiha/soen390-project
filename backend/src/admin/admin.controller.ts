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

  @Put('resolve-post/:reportId')
  async resolvePost (@Param('reportId') reportId: string, @AuthUser() authedUser: BearerPayload): Promise<void> {
    const user = (await authedUser.getUser()) as User

    if (user.type !== 'admin') {
      throw new Error('Unauthorized, Not an admin')
    }
    await this.adminService.resolvePost(reportId)
  }

  @Put('resolve-message/:reportId')
  async resolveMessage (@Param('reportId') reportId: string, @AuthUser() authedUser: BearerPayload): Promise<void> {
    const user = (await authedUser.getUser()) as User

    if (user.type !== 'admin') {
      throw new Error('Unauthorized, Not an admin')
    }
    await this.adminService.resolveMessage(reportId)
  }
}
