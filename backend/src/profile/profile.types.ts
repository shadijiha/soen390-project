import { ApiProperty } from '@nestjs/swagger'
import { BaseRequest } from 'src/util/util'

export namespace Profile {
  export class ProfileAddEducationRequest extends BaseRequest {
    @ApiProperty()
      institution: string

    @ApiProperty()
      degree: string

    @ApiProperty()
      start_year: number

    @ApiProperty()
      end_year: number
  }

  export class ProfileAddCourseRequest extends BaseRequest {
    @ApiProperty()
      courseName: string

    @ApiProperty()
      courseNumber: string
  }

  export class ProfileAddProjectRequest extends BaseRequest {
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

  export class ProfileAddVolunteeringRequest extends BaseRequest {
    @ApiProperty()
      company: string

    @ApiProperty()
      title: string

    @ApiProperty()
      start_year: number

    @ApiProperty()
      end_year: number
  }
}
