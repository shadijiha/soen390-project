/**
 * Types for Request and Respose
 */

import { ApiProperty } from "@nestjs/swagger";
import { App } from "src/app.types";
import { Award } from "src/models/award.entity";
import { Course } from "src/models/course.entity";
import { Education } from "src/models/education.entity";
import { Language } from "src/models/language.entity";
import { Project } from "src/models/project.entity";
import { Recommendation } from "src/models/recommendation.entity";
import { Skill } from "src/models/skill.entity";
import { User } from "src/models/user.entity";
import { Volunteering } from "src/models/volunteering.entity";
import { Work } from "src/models/work.entity";

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
    @ApiProperty()
    firstName: string | null;

    @ApiProperty()
    lastName: string | null;

    @ApiProperty()
    email: string | null;

    @ApiProperty()
    mobileNo: string;

    @ApiProperty({ examples: ["male", "female"] })
    gender: "male" | "female" | null;

    @ApiProperty()
    biography: string;

    @ApiProperty({ type: [Education] })
    educations: Education[];

    @ApiProperty({ type: [Work] })
    workExperience: Work[];

    @ApiProperty({ type: [Volunteering] })
    volunteeringExperience: Volunteering[];

    @ApiProperty({ type: [User] })
    connections: User[];

    @ApiProperty({ type: [Skill] })
    skills: Skill[];

    @ApiProperty({ type: [Recommendation] })
    recommendationsReceived: Recommendation[];

    @ApiProperty({ type: [Recommendation] })
    recommendationsGiven: Recommendation[];

    @ApiProperty({ type: [Course] })
    courses: Course[];

    @ApiProperty({ type: [Project] })
    projects: Project[];

    @ApiProperty({ type: [Award] })
    awards: Award[];

    @ApiProperty({ type: [Language] })
    languages: Language[];
  }

  export class UpdateUserResponse extends App.WithStatus {
    @ApiProperty({ type: User })
    user: User | null;
  }
}
