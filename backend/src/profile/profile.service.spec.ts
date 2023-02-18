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
import { DataSource, Repository } from 'typeorm'
import { User } from '../models/user.entity'
import { Profile } from './profile.types'
import { dataSourceMockFactory, MockType } from '../util/mockDataSource'


describe('ProfileService', () => {
  let service: ProfileService
  let dataSourceMock: MockType<DataSource>
  let EducationRepository: Repository<Education>
  let CourseRepository: Repository<Course>
  let ProjectRepository: Repository<Project>
  let VolunteeringRepository: Repository<Volunteering>
  let AwardRepository: Repository<Award>
  let LanguageRepository: Repository<Language>
  let SkillRepository: Repository<Skill>
  let WorkRepository: Repository<Work>
  let UserRepository: Repository<User>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfileService,
        { provide: DataSource, useFactory: dataSourceMockFactory },
        {
          provide: getRepositoryToken(Education),
          useValue: createMock<Repository<Education>>()
        },
        {
          provide: getRepositoryToken(Course),
          useValue: createMock<Repository<Course>>()
        },
        {
          provide: getRepositoryToken(Project),
          useValue: createMock<Repository<Project>>()
        },
        {
          provide: getRepositoryToken(Volunteering),
          useValue: createMock<Repository<Volunteering>>()
        },
        {
          provide: getRepositoryToken(Award),
          useValue: createMock<Repository<Award>>()
        },
        {
          provide: getRepositoryToken(Language),
          useValue: createMock<Repository<Language>>()
        },
        {
          provide: getRepositoryToken(Skill),
          useValue: createMock<Repository<Skill>>()
        },
        {
          provide: getRepositoryToken(Work),
          useValue: createMock<Repository<Work>>()
        },
        {
          provide: getRepositoryToken(User),
          useValue: createMock<Repository<User>>()
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
})
