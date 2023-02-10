/**
 * Types for Request and Respose
 */

import { ApiProperty } from '@nestjs/swagger'
import { App } from '../app.types'
import { Award } from '../models/award.entity'
import { Course } from '../models/course.entity'
import { Education } from '../models/education.entity'
import { Language } from '../models/language.entity'
import { Project } from '../models/project.entity'
import { Recommendation } from '../models/recommendation.entity'
import { Skill } from '../models/skill.entity'
import { User } from '../models/user.entity'
import { Volunteering } from '../models/volunteering.entity'
import { Work } from '../models/work.entity'

export namespace Users {
  export class GetAllUsersRequest {}

  export class GetAllUsersResponse extends App.WithStatus {
    @ApiProperty({ isArray: true, type: User })
      user: User[] | null
  }

  export class GetUserResponse extends App.WithStatus {
    @ApiProperty({ type: User })
      user: User | null
  }

  export class UpdateUserRequest {
    @ApiProperty()
      firstName: string | null

    @ApiProperty()
      lastName: string | null

    @ApiProperty()
      email: string | null

    @ApiProperty()
      mobileNo: string

    @ApiProperty({ examples: ['male', 'female'] })
      gender: 'male' | 'female' | null

    @ApiProperty()
      biography: string

    @ApiProperty({ type: [Education] })
      educations: Education[]

    @ApiProperty({ type: [Work] })
      workExperience: Work[]

    @ApiProperty({ type: [Volunteering] })
      volunteeringExperience: Volunteering[]

    @ApiProperty({ type: [User] })
      connections: User[]

    @ApiProperty({ type: [Skill] })
      skills: Skill[]

    @ApiProperty({ type: [Recommendation] })
      recommendationsReceived: Recommendation[]

    @ApiProperty({ type: [Recommendation] })
      recommendationsGiven: Recommendation[]

    @ApiProperty({ type: [Course] })
      courses: Course[]

    @ApiProperty({ type: [Project] })
      projects: Project[]

    @ApiProperty({ type: [Award] })
      awards: Award[]

    @ApiProperty({ type: [Language] })
      languages: Language[]
  }

  export class UpdateUserResponse extends App.WithStatus {
    @ApiProperty({ type: User })
      user: User | null
  }
}
