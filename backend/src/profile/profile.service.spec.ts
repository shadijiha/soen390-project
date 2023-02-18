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
import { DataSource, Repository, UpdateResult } from 'typeorm'
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
})
