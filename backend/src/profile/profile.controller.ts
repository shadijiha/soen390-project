import {
  Body,
  Controller,
  Delete,
  HttpException,
  Param,
  Post,
  Put,
  UseGuards
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { AuthUser, BearerPayload } from '../util/util'
import { ProfileService } from './profile.service'
import { Profile } from './profile.types'

@Controller('profile')
@ApiTags('Profile')
@ApiBearerAuth()
// TODO: at this point after the JwtGuard there should be no null return from BearerPayload
// otherwise it does not make sense to authenticate and have a null user after auth.
// temporary shim for this issue
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) { }

  @Post('education')
  public async addEducation(
    @AuthUser() userInfo: BearerPayload,
    @Body() body: Profile.AddEducationRequest
  ): Promise<void> {
    let user = await userInfo.getUser(['educations'])
    if (!user) {
      return;
    }

    this.profileService
      .addEducation(user, body)
      .catch((e) => {
        throw new HttpException((e as Error).message, 400)
      })
  }

  @Put('edication/:id')
  public async editEdication(
    @AuthUser() userInfo: BearerPayload,
    @Body() body: Profile.EditEducationRequest
  ): Promise<void> {
    let user = await userInfo.getUser(['educations'])
    if (!user) {
      return;
    }

    this.profileService.editEducation(user, body)
      .catch((e) => {
        throw new HttpException((e as Error).message, 400)
      })
  }

  @Delete('education/:id')
  public async deleteEducation(
    @AuthUser() userInfo: BearerPayload,
    @Param('id') id: number
  ): Promise<void> {
    let user = await userInfo.getUser(['educations'])
    if (!user) {
      return;
    }

    this.profileService
      .removeEduction(user, id)
      .catch((e) => {
        throw new HttpException((e as Error).message, 400)
      })
  }

  @Post('course')
  public async addCourse(
    @AuthUser() userInfo: BearerPayload,
    @Body() body: Profile.AddCourseRequest
  ): Promise<void> {
    let user = await userInfo.getUser(['courses'])
    if (!user) return;
    this.profileService
      .addCourse(user, body)
      .catch((e) => {
        throw new HttpException((e as Error).message, 400)
      })
  }

  @Put('course/:id')
  public async editCourse(
    @AuthUser() userInfo: BearerPayload,
    @Body() body: Profile.EditCourseRequest
  ): Promise<void> {
    let user = await userInfo.getUser(['courses'])
    if (!user) {
      return;
    }

    this.profileService.editCourse(user, body)
      .catch((e) => {
        throw new HttpException((e as Error).message, 400)
      })
  }

  @Delete('course/:id')
  public async deleteCourse(
    @AuthUser() userInfo: BearerPayload,
    @Param('id') id: number
  ): Promise<void> {

    let user = await userInfo.getUser(['courses'])
    if (!user) return;
    this.profileService
      .removeCourse(user, id)
      .catch((e) => {
        throw new HttpException((e as Error).message, 400)
      })
  }

  @Post('project')
  public async addProject(
    @AuthUser() userInfo: BearerPayload,
    @Body() body: Profile.AddProjectRequest
  ): Promise<void> {
    let user = await userInfo.getUser(['projects'])
    if (!user) return;
    this.profileService
      .addProject(user, body)
      .catch((e) => {
        throw new HttpException((e as Error).message, 400)
      })
  }

  @Put('project/:id')
  public async editProject(
    @AuthUser() userInfo: BearerPayload,
    @Body() body: Profile.EditProjectRequest
  ): Promise<void> {
    let user = await userInfo.getUser(['projects'])
    if (!user) {
      return;
    }

    this.profileService.editProject(user, body)
      .catch((e) => {
        throw new HttpException((e as Error).message, 400)
      })
  }

  @Delete('project/:id')
  public async deleteProject(
    @AuthUser() userInfo: BearerPayload,
    @Param('id') id: number
  ): Promise<void> {
    let user = await userInfo.getUser(['projects'])
    if (!user) return;

    this.profileService
      .removeProject(user, id)
      .catch((e) => {
        throw new HttpException((e as Error).message, 400)
      })
  }

  @Post('volunteering')
  public async addVolunteering(
    @AuthUser() userInfo: BearerPayload,
    @Body() body: Profile.AddVolunteeringRequest
  ): Promise<void> {
    let user = await userInfo.getUser(['volunteeringExperience'])
    if (!user) return;

    this.profileService
      .addVolunteering(user, body)
      .catch((e) => {
        throw new HttpException((e as Error).message, 400)
      })
  }

  @Put('volunteering/:id')
  public async editVolunteering(
    @AuthUser() userInfo: BearerPayload,
    @Body() body: Profile.EditVolunteeringRequest
  ): Promise<void> {
    let user = await userInfo.getUser(['volunteeringExperience'])
    if (!user) {
      return;
    }

    this.profileService.editvolunteering(user, body)
      .catch((e) => {
        throw new HttpException((e as Error).message, 400)
      })
  }

  @Delete('volunteering/:id')
  public async deleteVolunteering(
    @AuthUser() userInfo: BearerPayload,
    @Param('id') id: number
  ): Promise<void> {
    let user = await userInfo.getUser(['volunteerings'])
    if (!user) return;

    this.profileService
      .removeVolunteering(user, id)
      .catch((e) => {
        throw new HttpException((e as Error).message, 400)
      })
  }

  @Post('award')
  public async addAward(
    @AuthUser() userInfo: BearerPayload,
    @Body() body: Profile.AddVolunteeringRequest
  ): Promise<void> {
    let user = await userInfo.getUser(['award'])
    if (!user) return;

    this.profileService
      .addVolunteering(user, body)
      .catch((e) => {
        throw new HttpException((e as Error).message, 400)
      })
  }

  @Put('award/:id')
  public async editAward(
    @AuthUser() userInfo: BearerPayload,
    @Body() body: Profile.EditVolunteeringRequest
  ): Promise<void> {
    let user = await userInfo.getUser(['award'])
    if (!user) {
      return;
    }

    this.profileService.editvolunteering(user, body)
      .catch((e) => {
        throw new HttpException((e as Error).message, 400)
      })
  }

  @Delete('award/:id')
  public async deleteAward(
    @AuthUser() userInfo: BearerPayload,
    @Param('id') id: number
  ): Promise<void> {
    let user = await userInfo.getUser(['award'])
    if (!user) return;

    this.profileService
      .removeAward(user, id)
      .catch((e) => {
        throw new HttpException((e as Error).message, 400)
      })
  }
}
