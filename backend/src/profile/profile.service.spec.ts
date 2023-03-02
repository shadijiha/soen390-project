import { Test, type TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm/dist/common/typeorm.utils'
import { Award } from '../models/award.entity'
import { Course } from '../models/course.entity'
import { Education } from '../models/education.entity'
import { Language } from '../models/language.entity'
import { Project } from '../models/project.entity'
import { Skill } from '../models/skill.entity'
import { Volunteering } from '../models/volunteering.entity'
import { Work } from '../models/work.entity'
import { ProfileService } from './profile.service'
import { createMock } from '@golevelup/ts-jest';
import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm'
import { User } from '../models/user.entity'
import { Profile } from './profile.types'
import { dataSourceMockFactory, MockType } from '../util/mockDataSource'


describe('ProfileService', () => {
  let service: ProfileService
  let dataSourceMock: MockType<DataSource>
  const EducationRepository = createMock<Repository<Education>>()
  const CourseRepository = createMock<Repository<Course>>()
  const ProjectRepository = createMock<Repository<Project>>()
  const VolunteeringRepository = createMock<Repository<Volunteering>>()
  const AwardRepository = createMock<Repository<Award>>()
  const LanguageRepository = createMock<Repository<Language>>()
  const SkillRepository = createMock<Repository<Skill>>()
  const WorkRepository = createMock<Repository<Work>>()
  const UserRepository = createMock<Repository<User>>()
  

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfileService,
        { provide: DataSource, useFactory: dataSourceMockFactory },
        {
          provide: getRepositoryToken(Education),
          useValue: EducationRepository
        },
        {
          provide: getRepositoryToken(Course),
          useValue: CourseRepository
        },
        {
          provide: getRepositoryToken(Project),
          useValue: ProjectRepository
        },
        {
          provide: getRepositoryToken(Volunteering),
          useValue: VolunteeringRepository
        },
        {
          provide: getRepositoryToken(Award),
          useValue: AwardRepository
        },
        {
          provide: getRepositoryToken(Language),
          useValue: LanguageRepository
        },
        {
          provide: getRepositoryToken(Skill),
          useValue: SkillRepository
        },
        {
          provide: getRepositoryToken(Work),
          useValue: WorkRepository
        },
        {
          provide: getRepositoryToken(User),
          useValue: UserRepository
        }
      ]
    }).compile()

    service = module.get<ProfileService>(ProfileService)
    dataSourceMock = module.get(DataSource)
    // EducationRepository = module.get<Repository<Education>>(getRepositoryToken(Education))
    // CourseRepository = module.get<Repository<Course>>(getRepositoryToken(Course))
    // ProjectRepository = module.get<Repository<Project>>(getRepositoryToken(Project))
    // VolunteeringRepository = module.get<Repository<Volunteering>>(getRepositoryToken(Volunteering))
    // AwardRepository = module.get<Repository<Award>>(getRepositoryToken(Award))
    // LanguageRepository = module.get<Repository<Language>>(getRepositoryToken(Language))
    // SkillRepository = module.get<Repository<Skill>>(getRepositoryToken(Skill))
    // WorkRepository = module.get<Repository<Work>>(getRepositoryToken(Work))
    // UserRepository = module.get<Repository<User>>(getRepositoryToken(User))


  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should add education to a user', async () => {
    const data: Profile.AddEducationRequest = new Profile.AddEducationRequest
    data.institution = "Concordia";
    data.degree = "Bachelor";
    data.start_year = 2014;
    data.end_year = 2020;
    const user: User = new User
    user.id = 1
    user.firstName = 'test'
    user.educations = []

    jest.spyOn(user, 'save').mockImplementation(() => Promise.resolve(user))

    await service.addEducation(user, data)
    expect(user.save).toBeCalledTimes(1)
  })

  it('should edit education of a user', async () => {
    const data: Profile.EditEducationRequest = new Profile.EditEducationRequest
    data.id = 1
    data.institution = "Concordia";
    data.degree = "Bachelor";
    data.start_year = 2014;
    data.end_year = 2020;
    const user: User = new User
    user.id = 1
    user.firstName = 'test'
    user.educations = [data as unknown as Education]
    const res = new UpdateResult

    EducationRepository.update.mockImplementation((user, data) => Promise.resolve(res))

    await service.editEducation(user, data)
    expect(EducationRepository.update).toBeCalledTimes(1)
    expect(EducationRepository.update).toBeCalledWith(user.id, data)
  })

  it('should remove education of a user', async () => {
    const data: Education = new Education
    data.id = 1
    data.institution = "Concordia";
    data.degree = "Bachelor";
    data.start_year = 2014;
    data.end_year = 2020;
    const user: User = new User
    user.id = 1
    user.firstName = 'test'
    user.educations = [data as unknown as Education]
    const res = new DeleteResult

    EducationRepository.delete.mockImplementation(() => Promise.resolve(res))
    EducationRepository.findOneOrFail.mockResolvedValue(data)

    await service.removeEducation(user, data.id)
    expect(EducationRepository.delete).toBeCalledTimes(1)
    expect(EducationRepository.delete).toBeCalledWith({ id: data.id })
  })

  it('should add course to a user', async () => {
    const data: Profile.AddCourseRequest = new Profile.AddCourseRequest
    data.courseName = "minicap";
    data.courseNumber = "soen390";
    const user: User = new User
    user.id = 1
    user.firstName = 'test'
    user.courses = []

    jest.spyOn(user, 'save').mockImplementation(() => Promise.resolve(user))

    await service.addCourse(user, data)
    expect(user.save).toBeCalledTimes(1)
  })

  it('should edit course of a user', async () => {
    const data: Profile.EditCourseRequest = new Profile.EditCourseRequest
    data.id = 1
    data.courseName = "minicap";
    data.courseNumber = "soen390";
    const user: User = new User
    user.id = 1
    user.firstName = 'test'
    user.courses = [data as unknown as Course]
    const res = new UpdateResult

    CourseRepository.update.mockImplementation((user, data) => Promise.resolve(res))

    await service.editCourse(user, data)
    expect(CourseRepository.update).toBeCalledTimes(1)
    expect(CourseRepository.update).toBeCalledWith(user.id, data)
  })

  it('should remove course of a user', async () => {
    const data: Course = new Course
    data.id = 1
    data.courseName = "minicap";
    data.courseNumber = "soen390";
    const user: User = new User
    user.id = 1
    user.firstName = 'test'
    user.courses = [data as unknown as Course]
    const res = new DeleteResult

    CourseRepository.delete.mockImplementation(() => Promise.resolve(res))
    CourseRepository.findOneOrFail.mockResolvedValue(data)

    await service.removeCourse(user, data.id)
    expect(CourseRepository.delete).toBeCalledTimes(1)
    expect(CourseRepository.delete).toBeCalledWith({ id: data.id })
  })

  it('should add project to a user', async () => {
    const data: Profile.AddProjectRequest = new Profile.AddProjectRequest
    data.description = "minicap";
    data.name = "soen390";
    data.url = 'test.ca'
    const user: User = new User
    user.id = 1
    user.firstName = 'test'
    user.projects = []

    jest.spyOn(user, 'save').mockImplementation(() => Promise.resolve(user))

    await service.addProject(user, data)
    expect(user.save).toBeCalledTimes(1)
  })

  it('should edit project of a user', async () => {
    const data: Profile.EditProjectRequest = new Profile.EditProjectRequest
    data.id = 1
    data.description = "minicap";
    data.name = "soen390";
    data.url = 'test.ca'
    const user: User = new User
    user.id = 1
    user.firstName = 'test'
    user.projects = [data as unknown as Project]
    const res = new UpdateResult

    ProjectRepository.update.mockImplementation((user, data) => Promise.resolve(res))

    await service.editProject(user, data)
    expect(ProjectRepository.update).toBeCalledTimes(1)
    expect(ProjectRepository.update).toBeCalledWith(user.id, data)
  })

  it('should remove project of a user', async () => {
    const data: Project = new Project
    data.id = 1
    data.description = "minicap";
    data.name = "soen390";
    data.url = 'test.ca'
    const user: User = new User
    user.id = 1
    user.firstName = 'test'
    user.projects = [data as unknown as Project]
    const res = new DeleteResult

    ProjectRepository.delete.mockImplementation(() => Promise.resolve(res))
    ProjectRepository.findOneOrFail.mockResolvedValue(data)

    await service.removeProject(user, data.id)
    expect(ProjectRepository.delete).toBeCalledTimes(1)
    expect(ProjectRepository.delete).toBeCalledWith({ id: data.id })
  })

  it('should add volunteering to a user', async () => {
    const data: Profile.AddVolunteeringRequest = new Profile.AddVolunteeringRequest
    data.company = "minicap"
    data.start_year = 2000
    data.end_year = 2020
    data.title = 'super helper'
    const user: User = new User
    user.id = 1
    user.firstName = 'test'
    user.volunteeringExperience = []

    jest.spyOn(user, 'save').mockImplementation(() => Promise.resolve(user))

    await service.addVolunteering(user, data)
    expect(user.save).toBeCalledTimes(1)
  })

  it('should edit volunteering of a user', async () => {
    const data: Profile.EditVolunteeringRequest = new Profile.EditVolunteeringRequest
    data.id = 1
    data.company = "minicap"
    data.start_year = 2000
    data.end_year = 2020
    data.title = 'super helper'
    const user: User = new User
    user.id = 1
    user.firstName = 'test'
    user.volunteeringExperience = [data as unknown as Volunteering]
    const res = new UpdateResult

    VolunteeringRepository.update.mockImplementation((user, data) => Promise.resolve(res))

    await service.editvolunteering(user, data)
    expect(VolunteeringRepository.update).toBeCalledTimes(1)
    expect(VolunteeringRepository.update).toBeCalledWith(user.id, data)
  })

  it('should remove volunteering of a user', async () => {
    const data: Volunteering = new Volunteering
    data.id = 1
    data.company = "minicap"
    data.start_year = 2000
    data.end_year = 2020
    data.title = 'super helper'
    const user: User = new User
    user.id = 1
    user.firstName = 'test'
    user.volunteeringExperience = [data as unknown as Volunteering]
    const res = new DeleteResult

    VolunteeringRepository.delete.mockImplementation(() => Promise.resolve(res))
    VolunteeringRepository.findOneOrFail.mockResolvedValue(data)

    await service.removeVolunteering(user, data.id)
    expect(VolunteeringRepository.delete).toBeCalledTimes(1)
    expect(VolunteeringRepository.delete).toBeCalledWith({ id: data.id })
  })

  it('should add award to a user', async () => {
    const data: Profile.AddAwardRequest = new Profile.AddAwardRequest
    data.description = "Something"
    data.issue_date = new Date(2000)
    data.issuer = 'Concordia University'
    data.title = 'super helper'
    data.url = 'test.ca'
    const user: User = new User
    user.id = 1
    user.firstName = 'test'
    user.awards = []

    jest.spyOn(user, 'save').mockImplementation(() => Promise.resolve(user))

    await service.addAward(user, data)
    expect(user.save).toBeCalledTimes(1)
  })

  it('should edit Award of a user', async () => {
    const data: Profile.EditAwardRequest = new Profile.EditAwardRequest
    data.id = 1
    data.description = "Something"
    data.issue_date = new Date(2000)
    data.issuer = 'Concordia University'
    data.title = 'super helper'
    data.url = 'test.ca'
    data.title = 'super helper'
    const user: User = new User
    user.id = 1
    user.firstName = 'test'
    user.awards = [data as unknown as Award]
    const res = new UpdateResult

    AwardRepository.update.mockImplementation((user, data) => Promise.resolve(res))

    await service.editAward(user, data)
    expect(AwardRepository.update).toBeCalledTimes(1)
    expect(AwardRepository.update).toBeCalledWith(user.id, data)
  })

  it('should remove Award of a user', async () => {
    const data: Award = new Award
    data.id = 1
    data.description = "Something"
    data.issue_date = new Date(2000)
    data.issuer = 'Concordia University'
    data.title = 'super helper'
    data.url = 'test.ca'
    data.title = 'super helper'
    const user: User = new User
    user.id = 1
    user.firstName = 'test'
    user.awards = [data as unknown as Award]
    const res = new DeleteResult

    AwardRepository.delete.mockImplementation(() => Promise.resolve(res))
    AwardRepository.findOneOrFail.mockResolvedValue(data)

    await service.removeAward(user, data.id)
    expect(AwardRepository.delete).toBeCalledTimes(1)
    expect(AwardRepository.delete).toBeCalledWith({ id: data.id })
  })

  it('should add Language to a user', async () => {
    const data: Profile.AddLanguageRequest = new Profile.AddLanguageRequest
    data.languageName = "English"
    data.proficiency = "Advanced"
    const user: User = new User
    user.id = 1
    user.firstName = 'test'
    user.languages = []

    jest.spyOn(user, 'save').mockImplementation(() => Promise.resolve(user))

    await service.addLanguage(user, data)
    expect(user.save).toBeCalledTimes(1)
  })

  it('should edit Language of a user', async () => {
    const data: Profile.EditLanguageRequest = new Profile.EditLanguageRequest
    data.id = 1
    data.languageName = "English"
    data.proficiency = "Advanced"
    const user: User = new User
    user.id = 1
    user.firstName = 'test'
    user.languages = [data as unknown as Language]
    const res = new UpdateResult

    LanguageRepository.update.mockImplementation((user, data) => Promise.resolve(res))

    await service.editLanguage(user, data)
    expect(LanguageRepository.update).toBeCalledTimes(1)
    expect(LanguageRepository.update).toBeCalledWith(user.id, data)
  })

  it('should remove Language of a user', async () => {
    const data: Language = new Language
    data.id = 1
    data.languageName = "English"
    data.proficiency = "Advanced"
    const user: User = new User
    user.id = 1
    user.firstName = 'test'
    user.languages = [data as unknown as Language]
    const res = new DeleteResult

    LanguageRepository.delete.mockImplementation(() => Promise.resolve(res))
    LanguageRepository.findOneOrFail.mockResolvedValue(data)

    await service.removeLanguage(user, data.id)
    expect(LanguageRepository.delete).toBeCalledTimes(1)
    expect(LanguageRepository.delete).toBeCalledWith({ id: data.id })
  })

  it('should add Skill to a user', async () => {
    const data: Profile.AddSkillRequest = new Profile.AddSkillRequest
    data.title = "President"
    const user: User = new User
    user.id = 1
    user.firstName = 'test'
    user.skills = []

    jest.spyOn(user, 'save').mockImplementation(() => Promise.resolve(user))

    await service.addSkill(user, data)
    expect(user.save).toBeCalledTimes(1)
  })

  it('should add Skills to a user', async () => {
    const data: Profile.AddSkillRequest = new Profile.AddSkillRequest
    data.title = "President,Developer,Magician"
    const user: User = new User
    user.id = 1
    user.firstName = 'test'
    user.skills = []

    let savedUser = JSON.parse(JSON.stringify(user)) // deep cope
    const s1 = new Skill
    s1.title = 'President'
    const s2 = new Skill
    s2.title = 'Developer'
    const s3 = new Skill
    s3.title = 'Magician'
    savedUser.skills = [s1, s2, s3]

    jest.spyOn(user, 'save').mockImplementation(() => Promise.resolve(user))
    SkillRepository.find.mockResolvedValue([]);

    await service.addSkill(user, data)
    expect(user.save).toBeCalledTimes(1)
    expect(user).toMatchObject(savedUser)
  })

  it('should not add an empty skill to a user', async () => {
    const data: Profile.AddSkillRequest = new Profile.AddSkillRequest
    data.title = ""
    const user: User = new User
    user.id = 1
    user.firstName = 'test'
    user.skills = []

    let savedUser = JSON.parse(JSON.stringify(user)) // deep cope
    jest.spyOn(user, 'save').mockImplementation(() => Promise.resolve(user))

    
    
    await service.addSkill(user, data)
    expect(user.save).toBeCalledTimes(0)
    expect(user).toMatchObject(savedUser)
  })

  it('should remove Skill of a user', async () => {
    const data: Skill = new Skill
    data.id = 1
    data.title = "President"
    const user: User = new User
    user.id = 1
    user.firstName = 'test'
    user.skills = [data as unknown as Skill]
    const res = new DeleteResult

    SkillRepository.delete.mockImplementation(() => Promise.resolve(res))
    SkillRepository.findOneOrFail.mockResolvedValue(data)
    jest.spyOn(user, 'save').mockImplementation(() => Promise.resolve(user))

    await service.removeSkill(user, data.id)
    expect(user.save).toBeCalledTimes(1)
  })

  it('should add Work to a user', async () => {
    const data: Profile.AddWorkRequest = new Profile.AddWorkRequest
    data.company = "Concordia"
    data.title = "President"
    data.start_year = 1000
    data.end_year = 3000
    const user: User = new User
    user.id = 1
    user.firstName = 'test'
    user.workExperiences = []

    jest.spyOn(user, 'save').mockImplementation(() => Promise.resolve(user))

    await service.addWork(user, data)
    expect(user.save).toBeCalledTimes(1)
  })

  it('should edit Work of a user', async () => {
    const data: Profile.EditWorkRequest = new Profile.EditWorkRequest
    data.id = 1
    data.company = "Concordia"
    data.title = "President"
    data.start_year = 1000
    data.end_year = 3000
    const user: User = new User
    user.id = 1
    user.firstName = 'test'
    user.workExperiences = [data as unknown as Work]
    const res = new UpdateResult

    WorkRepository.update.mockImplementation((user, data) => Promise.resolve(res))

    await service.editWork(user, data)
    expect(WorkRepository.update).toBeCalledTimes(1)
    expect(WorkRepository.update).toBeCalledWith(user.id, data)
  })

  it('should remove Work of a user', async () => {
    const data: Work = new Work
    data.id = 1
    data.company = "Concordia"
    data.title = "President"
    data.start_year = 1000
    data.end_year = 3000
    const user: User = new User
    user.id = 1
    user.firstName = 'test'
    user.workExperiences = [data as unknown as Work]
    const res = new DeleteResult

    WorkRepository.delete.mockImplementation(() => Promise.resolve(res))
    WorkRepository.findOneOrFail.mockResolvedValue(data)

    await service.removeWork(user, data.id)
    expect(WorkRepository.delete).toBeCalledTimes(1)
    expect(WorkRepository.delete).toBeCalledWith({ id: data.id })
  })
})
