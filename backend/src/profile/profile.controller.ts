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
  constructor (private readonly profileService: ProfileService) { }

  @Post('education')
  public async addEducation (
    @AuthUser() userInfo: BearerPayload,
      @Body() body: Profile.AddEducationRequest
  ): Promise<void> {
    const user = await userInfo.getUser(['education'])
    if (user == null) {
      return
    }

    this.profileService
      .addEducation(user, body)
      .catch((e) => {
        throw new HttpException((e as Error).message, 400)
      })
  }

  @Put('education/:id')
  public async editEdication (
    @AuthUser() userInfo: BearerPayload,
      @Body() body: Profile.EditEducationRequest
  ): Promise<void> {
    const user = await userInfo.getUser(['education'])
    if (user == null) {
      return
    }

    this.profileService.editEducation(user, body)
      .catch((e) => {
        throw new HttpException((e as Error).message, 400)
      })
  }

  @Delete('education/:id')
  public async deleteEducation (
    @AuthUser() userInfo: BearerPayload,
      @Param('id') id: number
  ): Promise<void> {
    const user = await userInfo.getUser(['education'])
    if (user == null) {
      return
    }

    this.profileService
      .removeEduction(user, id)
      .catch((e) => {
        throw new HttpException((e as Error).message, 400)
      })
  }

  @Post('course')
  public async addCourse (
    @AuthUser() userInfo: BearerPayload,
      @Body() body: Profile.AddCourseRequest
  ): Promise<void> {
    const user = await userInfo.getUser(['courses'])
    if (user == null) return
    this.profileService
      .addCourse(user, body)
      .catch((e) => {
        throw new HttpException((e as Error).message, 400)
      })
  }

  @Put('course/:id')
  public async editCourse (
    @AuthUser() userInfo: BearerPayload,
      @Body() body: Profile.EditCourseRequest
  ): Promise<void> {
    const user = await userInfo.getUser(['courses'])
    if (user == null) {
      return
    }

    this.profileService.editCourse(user, body)
      .catch((e) => {
        throw new HttpException((e as Error).message, 400)
      })
  }

  @Delete('course/:id')
  public async deleteCourse (
    @AuthUser() userInfo: BearerPayload,
      @Param('id') id: number
  ): Promise<void> {
    const user = await userInfo.getUser(['courses'])
    if (user == null) return
    this.profileService
      .removeCourse(user, id)
      .catch((e) => {
        throw new HttpException((e as Error).message, 400)
      })
  }

  @Post('project')
  public async addProject (
    @AuthUser() userInfo: BearerPayload,
      @Body() body: Profile.AddProjectRequest
  ): Promise<void> {
    const user = await userInfo.getUser(['projects'])
    if (user == null) return
    this.profileService
      .addProject(user, body)
      .catch((e) => {
        throw new HttpException((e as Error).message, 400)
      })
  }

  @Put('project/:id')
  public async editProject (
    @AuthUser() userInfo: BearerPayload,
      @Body() body: Profile.EditProjectRequest
  ): Promise<void> {
    const user = await userInfo.getUser(['projects'])
    if (user == null) {
      return
    }

    this.profileService.editProject(user, body)
      .catch((e) => {
        throw new HttpException((e as Error).message, 400)
      })
  }

  @Delete('project/:id')
  public async deleteProject (
    @AuthUser() userInfo: BearerPayload,
      @Param('id') id: number
  ): Promise<void> {
    const user = await userInfo.getUser(['projects'])
    if (user == null) return

    this.profileService
      .removeProject(user, id)
      .catch((e) => {
        throw new HttpException((e as Error).message, 400)
      })
  }

  @Post('volunteering')
  public async addVolunteering (
    @AuthUser() userInfo: BearerPayload,
      @Body() body: Profile.AddVolunteeringRequest
  ): Promise<void> {
    const user = await userInfo.getUser(['volunteeringExperience'])
    if (user == null) return

    this.profileService
      .addVolunteering(user, body)
      .catch((e) => {
        throw new HttpException((e as Error).message, 400)
      })
  }

  @Put('volunteering/:id')
  public async editVolunteering (
    @AuthUser() userInfo: BearerPayload,
      @Body() body: Profile.EditVolunteeringRequest
  ): Promise<void> {
    const user = await userInfo.getUser(['volunteeringExperience'])
    if (user == null) {
      return
    }

    this.profileService.editvolunteering(user, body)
      .catch((e) => {
        throw new HttpException((e as Error).message, 400)
      })
  }

  @Delete('volunteering/:id')
  public async deleteVolunteering (
    @AuthUser() userInfo: BearerPayload,
      @Param('id') id: number
  ): Promise<void> {
    const user = await userInfo.getUser(['volunteerings'])
    if (user == null) return

    this.profileService
      .removeVolunteering(user, id)
      .catch((e) => {
        throw new HttpException((e as Error).message, 400)
      })
  }

  @Post('work')
  public async addWork (
    @AuthUser() userInfo: BearerPayload,
      @Body() body: Profile.AddWorkRequest
  ): Promise<void> {
    const user = await userInfo.getUser(['workExperiences'])
    if (user == null) return

    this.profileService
      .addWork(user, body)
      .catch((e) => {
        throw new HttpException((e as Error).message, 400)
      })
  }

  @Put('work/:id')
  public async editWork (
    @AuthUser() userInfo: BearerPayload,
      @Body() body: Profile.EditWorkRequest
  ): Promise<void> {
    const user = await userInfo.getUser(['workExperiences'])
    if (user == null) {
      return
    }

    this.profileService.editWork(user, body)
      .catch((e) => {
        throw new HttpException((e as Error).message, 400)
      })
  }

  @Delete('work/:id')
  public async deleteWork (
    @AuthUser() userInfo: BearerPayload,
      @Param('id') id: number
  ): Promise<void> {
    const user = await userInfo.getUser(['workExperiences'])
    if (user == null) return

    this.profileService
      .removeWork(user, id)
      .catch((e) => {
        throw new HttpException((e as Error).message, 400)
      })
  }

  @Post('skill')
  public async addSkill (
    @AuthUser() userInfo: BearerPayload,
      @Body() body: Profile.AddSkillRequest
  ): Promise<void> {
    const user = await userInfo.getUser(['skills'])
    if (user == null) return

    this.profileService
      .addSkill(user, body)
      .catch((e) => {
        throw new HttpException((e as Error).message, 400)
      })
  }

  @Put('skill/:id')
  public async editSkill (
    @AuthUser() userInfo: BearerPayload,
      @Body() body: Profile.EditSkillRequest
  ): Promise<void> {
    const user = await userInfo.getUser(['skills'])
    if (user == null) {
      return
    }

    this.profileService.editSkill(user, body)
      .catch((e) => {
        throw new HttpException((e as Error).message, 400)
      })
  }

  @Delete('skill/:id')
  public async deleteSkill (
    @AuthUser() userInfo: BearerPayload,
      @Param('id') id: number
  ): Promise<void> {
    const user = await userInfo.getUser(['skills'])
    if (user == null) return

    this.profileService
      .removeSkill(user, id)
      .catch((e) => {
        throw new HttpException((e as Error).message, 400)
      })
  }

  @Post('language')
  public async addLanguage (
    @AuthUser() userInfo: BearerPayload,
      @Body() body: Profile.AddLanguageRequest
  ): Promise<void> {
    const user = await userInfo.getUser(['language'])
    if (user == null) return

    this.profileService
      .addLanguage(user, body)
      .catch((e) => {
        throw new HttpException((e as Error).message, 400)
      })
  }

  @Put('language/:id')
  public async editLanguage (
    @AuthUser() userInfo: BearerPayload,
      @Body() body: Profile.EditLanguageRequest
  ): Promise<void> {
    const user = await userInfo.getUser(['language'])
    if (user == null) {
      return
    }

    this.profileService.editLanguage(user, body)
      .catch((e) => {
        throw new HttpException((e as Error).message, 400)
      })
  }

  @Delete('language/:id')
  public async deleteLanguage (
    @AuthUser() userInfo: BearerPayload,
      @Param('id') id: number
  ): Promise<void> {
    const user = await userInfo.getUser(['language'])
    if (user == null) return

    this.profileService
      .removeLanguage(user, id)
      .catch((e) => {
        throw new HttpException((e as Error).message, 400)
      })
  }

  @Post('award')
  public async addAward (
    @AuthUser() userInfo: BearerPayload,
      @Body() body: Profile.AddAwardRequest
  ): Promise<void> {
    const user = await userInfo.getUser(['award'])
    if (user == null) return

    this.profileService
      .addAward(user, body)
      .catch((e) => {
        throw new HttpException((e as Error).message, 400)
      })
  }

  @Put('award/:id')
  public async editAward (
    @AuthUser() userInfo: BearerPayload,
      @Body() body: Profile.EditAwardRequest
  ): Promise<void> {
    const user = await userInfo.getUser(['award'])
    if (user == null) {
      return
    }

    this.profileService.editAward(user, body)
      .catch((e) => {
        throw new HttpException((e as Error).message, 400)
      })
  }

  @Delete('award/:id')
  public async deleteAward (
    @AuthUser() userInfo: BearerPayload,
      @Param('id') id: number
  ): Promise<void> {
    const user = await userInfo.getUser(['award'])
    if (user == null) return

    this.profileService
      .removeAward(user, id)
      .catch((e) => {
        throw new HttpException((e as Error).message, 400)
      })
  }
}
