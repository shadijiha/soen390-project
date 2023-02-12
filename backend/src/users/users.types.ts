/**
 * Types for Request and Respose
 */

import { ApiProperty } from '@nestjs/swagger'
import { App } from '../app.types'
import { User } from '../models/user.entity'

export namespace Users {
  export class GetAllUsersResponse extends App.WithStatus {
    @ApiProperty({ isArray: true, type: User })
      user: User[] | null
  }

  export class GetUserResponse extends App.WithStatus {
    @ApiProperty({ type: User })
      user: User | null
  }

  export class UpdateUserRequest {
    @ApiProperty({ required: false })
      firstName: string

    @ApiProperty({ required: false })
      lastName: string

    @ApiProperty({ required: false })
      email: string

    @ApiProperty({ required: false })
      mobileNo: string

    @ApiProperty({ examples: ['male', 'female'], required: false })
      gender: 'male' | 'female' | ''

    @ApiProperty({ required: false })
      biography: string

    @ApiProperty({
      type: 'file',
      properties: {
        file: {
          type: 'string',
          format: 'binary'
        }
      },
      required: false
    }
    )
      profile_pic: Express.Multer.File

    @ApiProperty({
      type: 'file',
      properties: {
        file: {
          type: 'string',
          format: 'binary'
        }
      },
      required: false
    }
    )
      cover_pic: Express.Multer.File

    // @ApiProperty({ type: [Education] })
    // educations: Education[];

    // @ApiProperty({ type: [Work] })
    // workExperience: Work[];

    // @ApiProperty({ type: [Volunteering] })
    // volunteeringExperience: Volunteering[];

    // @ApiProperty({ type: [User] })
    // connections: User[];

    // @ApiProperty({ type: [Skill] })
    // skills: Skill[];

    // @ApiProperty({ type: [Recommendation] })
    // recommendationsReceived: Recommendation[];

    // @ApiProperty({ type: [Recommendation] })
    // recommendationsGiven: Recommendation[];

    // @ApiProperty({ type: [Course] })
    // courses: Course[];

    // @ApiProperty({ type: [Project] })
    // projects: Project[];

    // @ApiProperty({ type: [Award] })
    // awards: Award[];

    // @ApiProperty({ type: [Language] })
    // languages: Language[];
  }

  export class UpdateUserResponse extends App.WithStatus {
    @ApiProperty({ type: User })
      user: User | null
  }
}
