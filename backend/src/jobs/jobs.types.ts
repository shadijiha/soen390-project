import { ApiProperty } from '@nestjs/swagger'
import { BaseRequest } from '../util/util'

export namespace Jobs {
  export class AddJobRequest extends BaseRequest {
    @ApiProperty()
      jobTitle: string

    @ApiProperty()
      companyName: string

    @ApiProperty()
      location: string

    @ApiProperty()
      jobDescription: string

    @ApiProperty()
      salary: number

    @ApiProperty()
      jobType: 'full-time' | 'part-time' | 'contract' | 'other'

    @ApiProperty()
      startDate: Date

    @ApiProperty()
      coverLetter: boolean

    @ApiProperty()
      transcript: boolean

    @ApiProperty()
      skills: string
  }

  export class UpdateJobRequest extends AddJobRequest {}
}
