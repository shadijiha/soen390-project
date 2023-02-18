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

describe('ProfileService', () => {
  let service: ProfileService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfileService,
        {
          provide: getRepositoryToken(Education),
          useValue: {
            find: () => [],
            softRemove: () => null
          }
        },
        {
          provide: getRepositoryToken(Course),
          useValue: {
            find: () => [],
            softRemove: () => null
          }
        },
        {
          provide: getRepositoryToken(Project),
          useValue: {
            find: () => [],
            softRemove: () => null
          }
        },
        {
          provide: getRepositoryToken(Volunteering),
          useValue: {
            find: () => [],
            softRemove: () => null
          }
        },
        {
          provide: getRepositoryToken(Award),
          useValue: {
            find: () => [],
            softRemove: () => null
          }
        },
        {
          provide: getRepositoryToken(Language),
          useValue: {
            find: () => [],
            softRemove: () => null
          }
        },
        {
          provide: getRepositoryToken(Skill),
          useValue: {
            find: () => [],
            softRemove: () => null
          }
        },
        {
          provide: getRepositoryToken(Work),
          useValue: {
            find: () => [],
            softRemove: () => null
          }
        }
      ]
    }).compile()

    service = module.get<ProfileService>(ProfileService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
