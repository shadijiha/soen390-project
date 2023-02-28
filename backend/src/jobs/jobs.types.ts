import { ApiProperty } from '@nestjs/swagger'
import { Skill } from 'src/models/skill.entity'
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
      jobType: 'full-time' | 'part-time' | 'internship' | 'contract' | 'temporary' | 'volunteer' | 'other'

    @ApiProperty()
      startDate: Date

    @ApiProperty()
      skills: string
  }
}
