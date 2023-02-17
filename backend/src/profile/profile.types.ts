import { ApiProperty } from '@nestjs/swagger'
import { BaseRequest } from '../util/util'

export namespace Profile {
  export class AddEducationRequest extends BaseRequest {
    @ApiProperty()
      institution: string

    @ApiProperty()
      degree: string

    @ApiProperty()
      start_year: number

    @ApiProperty()
      end_year: number
  }

  export class AddCourseRequest extends BaseRequest {
    @ApiProperty()
      courseName: string

    @ApiProperty()
      courseNumber: string
  }

  export class AddProjectRequest extends BaseRequest {
    @ApiProperty()
      name: string

    @ApiProperty()
      description: string

    @ApiProperty()
      url: string

    @ApiProperty()
      start_year: number

    @ApiProperty()
      end_year: number
  }

  export class AddVolunteeringRequest extends BaseRequest {
    @ApiProperty()
      company: string

    @ApiProperty()
      title: string

    @ApiProperty()
      start_year: number

    @ApiProperty()
      end_year: number
  }

  export class AddAwardRequest extends BaseRequest {
    @ApiProperty()
      title: string

    @ApiProperty()
      issuer: string

    @ApiProperty()
      url: string

    @ApiProperty()
      issue_date: Date

    @ApiProperty()
      description: string
  }

  export class AddLanguageRequest extends BaseRequest {
    @ApiProperty()
      languageName: string

    @ApiProperty()
      proficiency: string
  }

  export class AddSkillRequest extends BaseRequest {
    @ApiProperty()
      company: string

    @ApiProperty()
      title: string

    @ApiProperty()
      start_year: number

    @ApiProperty()
      end_year: number
  }

  export class AddWorkRequest extends BaseRequest {
    @ApiProperty()
      company: string

    @ApiProperty()
      title: string

    @ApiProperty()
      start_year: number

    @ApiProperty()
      end_year: number
  }

  export class EditEducationRequest extends BaseRequest {
    @ApiProperty()
      id: number

    @ApiProperty({ required: false })
      institution: string

    @ApiProperty({ required: false })
      degree: string

    @ApiProperty({ required: false })
      start_year: number

    @ApiProperty({ required: false })
      end_year: number
  }

  export class EditCourseRequest extends BaseRequest {
    @ApiProperty()
      id: number

    @ApiProperty({ required: false })
      courseName: string

    @ApiProperty({ required: false })
      courseNumber: string
  }

  export class EditProjectRequest extends BaseRequest {
    @ApiProperty()
      id: number

    @ApiProperty({ required: false })
      name: string

    @ApiProperty({ required: false })
      description: string

    @ApiProperty({ required: false })
      url: string

    @ApiProperty({ required: false })
      start_year: number

    @ApiProperty({ required: false })
      end_year: number
  }

  export class EditVolunteeringRequest extends BaseRequest {
    @ApiProperty()
      id: number

    @ApiProperty({ required: false })
      company: string

    @ApiProperty({ required: false })
      title: string

    @ApiProperty({ required: false })
      start_year: number

    @ApiProperty({ required: false })
      end_year: number
  }

  export class EditAwardRequest extends BaseRequest {
    @ApiProperty({ required: false })
      id: number

    @ApiProperty({ required: false })
      title: string

    @ApiProperty({ required: false })
      issuer: string

    @ApiProperty({ required: false })
      url: string

    @ApiProperty({ required: false })
      issue_date: Date

    @ApiProperty({ required: false })
      description: string
  }

  export class EditLanguageRequest extends BaseRequest {
    @ApiProperty()
      id: number

    @ApiProperty({ required: false })
      languageName: string

    @ApiProperty({ required: false })
      proficiency: string
  }

  export class EditSkillRequest extends BaseRequest {
    @ApiProperty()
      id: number

    @ApiProperty({ required: false })
      company: string

    @ApiProperty({ required: false })
      title: string

    @ApiProperty({ required: false })
      start_year: number

    @ApiProperty({ required: false })
      end_year: number
  }

  export class EditWorkRequest extends BaseRequest {
    @ApiProperty()
      id: number

    @ApiProperty({ required: false })
      company: string

    @ApiProperty({ required: false })
      title: string

    @ApiProperty({ required: false })
      start_year: number

    @ApiProperty({ required: false })
      end_year: number
  }
}
