/**
 * Types for Request and Respose
 */

import { ApiConsumes, ApiProperty } from "@nestjs/swagger";
import { EMPTY } from "rxjs";
import { App } from "../app.types";
import { Award } from "../models/award.entity";
import { Course } from "../models/course.entity";
import { Education } from "../models/education.entity";
import { Language } from "../models/language.entity";
import { Project } from "../models/project.entity";
import { Recommendation } from "../models/recommendation.entity";
import { Skill } from "../models/skill.entity";
import { User } from "../models/user.entity";
import { Volunteering } from "../models/volunteering.entity";
import { Work } from "../models/work.entity";

export namespace Users {
  export class GetAllUsersRequest {}

  export class GetAllUsersResponse extends App.WithStatus {
    @ApiProperty({ isArray: true, type: User })
    user: User[] | null;
  }

  export class GetUserResponse extends App.WithStatus {
    @ApiProperty({ type: User })
    user: User | null;
  }

  export class UpdateUserRequest {
    @ApiProperty({required: false})
    firstName: string | null;

    @ApiProperty({required: false})
    lastName: string | null;

    @ApiProperty({required: false})
    email: string | null;

    @ApiProperty({required: false})
    mobileNo: string;

    @ApiProperty({ examples: ["male", "female"], required: false })
    gender: "male" | "female" | null | '';

    @ApiProperty({required: false})
    biography: string;

     @ApiProperty({
      type: "file",
      properties: {
        file: {
          type: "string",
          format: "binary",
        },
      }, required: false}
  )
    profile_pic: Express.Multer.File;

    @ApiProperty({
      type: "file",
      properties: {
        file: {
          type: "string",
          format: "binary",
        },
      }, required: false}
  )
    cover_pic: Express.Multer.File;

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
    user: User | null;
  }
}
