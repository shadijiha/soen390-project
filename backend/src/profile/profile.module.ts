import { Module } from '@nestjs/common'
import { ProfileService } from './profile.service'
import { ProfileController } from './profile.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Education } from '../models/education.entity'
import { Volunteering } from '../models/volunteering.entity'
import { Project } from '../models/project.entity'
import { Course } from '../models/course.entity'
import { Award } from '../models/award.entity'
import { Language } from '../models/language.entity'
import { Skill } from '../models/skill.entity'

@Module({
  providers: [ProfileService],
  controllers: [ProfileController],
  imports: [TypeOrmModule.forFeature([Education, Course, Volunteering, Project, Award, Language, Skill])]
})
export class ProfileModule { }
