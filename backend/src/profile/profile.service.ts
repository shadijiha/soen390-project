import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { type BaseRequest } from 'src/util/util'
import { Repository, UpdateResult, type BaseEntity } from 'typeorm'
import { Award } from '../models/award.entity'
import { Course } from '../models/course.entity'
import { Education } from '../models/education.entity'
import { Language } from '../models/language.entity'
import { Project } from '../models/project.entity'
import { type User } from '../models/user.entity'
import { Volunteering } from '../models/volunteering.entity'
import { type Profile } from './profile.types'

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Education) private readonly educationRepository: Repository<Education>,
    @InjectRepository(Course) private readonly courseRepository: Repository<Course>,
    @InjectRepository(Project) private readonly projectRepository: Repository<Project>,
    @InjectRepository(Volunteering) private readonly volunteeringRepository: Repository<Volunteering>,
    @InjectRepository(Award) private readonly awardRepository: Repository<Award>,
    @InjectRepository(Language) private readonly languageRepository: Repository<Language>,
  ) { }

  public async addEducation(
    user: User,
    data: Profile.AddEducationRequest
  ): Promise<void> {
    const education = new Education()
    this.createModel(data, education)
    user.educations = [...user.educations, education]
    await user.save()
  }

  public async removeEduction(user: User, id: number): Promise<void> {

    user.educations = user.educations.filter((e) => e.id !== id)
    await user.save()
  }

  public editEducation(user: User, request: Profile.EditEducationRequest): Promise<boolean> {
    let found = user.educations.find((e) => e.id == request.id)
    if (!found) {
      throw new NotFoundException
    }
    let education: Education = found as Education
    return this.educationRepository.update(education.id, request).then((res: UpdateResult) => res.affected ? true : false)
  }

  public async addCourse(
    user: User,
    data: Profile.AddCourseRequest
  ): Promise<void> {

    const course = new Course()
    this.createModel(data, course)
    user.courses = [...user.courses, course]
    await user.save()
  }

  public async removeCourse(user: User, id: number): Promise<void> {

    user.courses = user.courses.filter((c) => c.id !== id)
    await user.save()
  }

  public editCourse(user: User, request: Profile.EditCourseRequest): Promise<boolean> {
    let found = user.courses.find((c) => c.id == request.id)
    if (!found) {
      throw new NotFoundException
    }
    let course: Course = found as Course
    return this.courseRepository.update(course.id, request).then((res: UpdateResult) => res.affected ? true : false)
  }

  public async addProject(
    user: User,
    data: Profile.AddProjectRequest
  ): Promise<void> {

    const project = new Project()
    this.createModel(data, project)
    user.projects = [...user.projects, project]
    await user.save()
  }

  public async removeProject(user: User, id: number): Promise<void> {
    user.projects = user.projects.filter((p) => p.id !== id)
    await user.save()
  }

  public editProject(user: User, request: Profile.EditProjectRequest): Promise<boolean> {
    let found = user.projects.find((p) => p.id == request.id)
    if (!found) {
      throw new NotFoundException
    }
    let project: Project = found as Project
    return this.projectRepository.update(project.id, request).then((res: UpdateResult) => res.affected ? true : false)
  }

  public async addVolunteering(
    user: User,
    data: Profile.AddVolunteeringRequest
  ): Promise<void> {

    const volunteering = new Volunteering()
    this.createModel(data, volunteering)
    user.volunteeringExperience = [
      ...user.volunteeringExperience,
      volunteering
    ]
    await user.save()
  }

  public async removeVolunteering(
    user: User,
    id: number
  ): Promise<void> {

    user.volunteeringExperience = user.volunteeringExperience.filter(
      (v) => v.id !== id
    )
    await user.save()
  }

  public editvolunteering(user: User, request: Profile.EditVolunteeringRequest): Promise<boolean> {
    let found = user.volunteeringExperience.find((v) => v.id == request.id)
    if (!found) {
      throw new NotFoundException
    }
    let volunteering: Volunteering = found as Volunteering
    return this.volunteeringRepository.update(volunteering.id, request).then((res: UpdateResult) => res.affected ? true : false)
  }

  public async addAward(
    user: User,
    data: Profile.AddAwardRequest
  ): Promise<void> {
    const award = new Award()
    this.createModel(data, award)
    user.awards = [...user.awards, award]
    await user.save()
  }

  public async removeAward(
    user: User,
    id: number
  ): Promise<void> {

    user.awards = user.awards.filter(
      (a) => a.id !== id
    )
    await user.save()
  }

  public editAward(user: User, request: Profile.EditAwardRequest): Promise<boolean> {
    let found = user.awards.find((v) => v.id == request.id)
    if (!found) {
      throw new NotFoundException
    }
    let award: Award = found as Award
    return this.awardRepository.update(award.id, request).then((res: UpdateResult) => res.affected ? true : false)
  }

  public async addLanguage(
    user: User,
    data: Profile.AddLanguageRequest
  ): Promise<void> {
    const language = new Language()
    this.createModel(data, language)
    user.languages = [...user.languages, language]
    await user.save()
  }

  public async removeLanguage(
    user: User,
    id: number
  ): Promise<void> {

    user.languages = user.languages.filter(
      (l) => l.id !== id
    )
    await user.save()
  }

  public editLanguage(user: User, request: Profile.EditLanguageRequest): Promise<boolean> {
    let found = user.languages.find((l) => l.id == request.id)
    if (!found) {
      throw new NotFoundException
    }
    let language: Language = found as Language
    return this.languageRepository.update(language.id, request).then((res: UpdateResult) => res.affected ? true : false)
  }

  /*
   * Assign only what exist in target, in case we have hydrated request after it arrived
   */
  private createModel(source: BaseRequest, target: BaseEntity): void {
    for (const prop in target) {
      target[prop] = source[prop]
    }
  }
}
