import { Body, Controller, Delete, Get, Param, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common'
import { FileFieldsInterceptor } from '@nestjs/platform-express'
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { type Application } from '../models/application.entity'
import { type User } from '../models/user.entity'
import { ApplicationFileValidationPipe } from '../util/fileValidationPipe'
import { AuthUser, BearerPayload } from '../util/util'
import { ApplicationService } from './application.service'
import { Applications } from './applications.types'

@Controller('application')
@ApiTags('Application')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ApplicationController {
  constructor (private readonly applicationService: ApplicationService) {}

  // post an application route
  @Post(':id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'cv', maxCount: 1 },
      { name: 'coverLetter', maxCount: 1 }
    ])
  )
  async postApplication (
    @Param('id') jobId: string,
      @AuthUser() authedUser: BearerPayload,
      @Body() application: Applications.AddApplicationRequest,
      @UploadedFiles(ApplicationFileValidationPipe) files: { cv?: Express.Multer.File, coverLetter?: Express.Multer.File }
  ): Promise<void> {
    const user = (await authedUser.getUser()) as User
    await this.applicationService.postApplication(parseInt(jobId), user, application, files)
  }

  // delete an application route
  @Delete(':id')
  async deleteApplication (@Param('id') applicationId: string, @AuthUser() authedUser: BearerPayload): Promise<void> {
    const user: User = (await authedUser.getUser(['applications'])) as User
    if (user == null) {
      return
    }

    await this.applicationService.deleteApplication(parseInt(applicationId), user)
  }

  // get all my applications
  @Get('/my')
  async getMyApplications (@AuthUser() authedUser: BearerPayload): Promise<Application[] | undefined> {
    const user: User = (await authedUser.getUser(['applications'])) as User
    if (user == null) {
      return
    }

    return await this.applicationService.getMyApplications(user)
  }
}
