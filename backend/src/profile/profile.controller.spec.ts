import { ExecutionContext } from '@nestjs/common'
import { createMock } from '@golevelup/ts-jest';
import { Test, type TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { Award } from '../models/award.entity'
import { Course } from '../models/course.entity'
import { Education } from '../models/education.entity'
import { Language } from '../models/language.entity'
import { Project } from '../models/project.entity'
import { Skill } from '../models/skill.entity'
import { User } from '../models/user.entity'
import { Volunteering } from '../models/volunteering.entity'
import { Work } from '../models/work.entity'
import { ProfileController } from './profile.controller'
import { ProfileService } from './profile.service'
import { isGuarded } from '../util/testUtil';
import { BearerPayload, createTestBearerPayload } from '../util/util';
import { Profile } from './profile.types';

describe('ProfileController', () => {
  let controller: ProfileController
  let service: ProfileService

  let loggedInUser: BearerPayload

  let educationRepository: Repository<Education>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController],
      providers: [
        ProfileService,
        {
          provide: getRepositoryToken(Education),
          useValue: createMock<Repository<Education>>(),
        },
        {
          provide: getRepositoryToken(Course),
          useValue: createMock<Repository<Course>>(),
        },
        {
          provide: getRepositoryToken(Project),
          useValue: createMock<Repository<Project>>(),
        },
        {
          provide: getRepositoryToken(Volunteering),
          useValue: createMock<Repository<Volunteering>>(),
        },
        {
          provide: getRepositoryToken(Award),
          useValue: createMock<Repository<Award>>(),
        },
        {
          provide: getRepositoryToken(Language),
          useValue: createMock<Repository<Language>>(),
        },
        {
          provide: getRepositoryToken(Skill),
          useValue: createMock<Repository<Skill>>(),
        },
        {
          provide: getRepositoryToken(Work),
          useValue: createMock<Repository<Work>>(),
        },
        {
          provide: getRepositoryToken(User),
          useValue: { findOne: jest.fn((emai) => user) }
        },
      ]
    }).overrideGuard(JwtAuthGuard) // to bypass JWT auth
      .useValue({
        canActivate: (context: ExecutionContext) => {
          return true
        },
      })
      .compile()

    controller = module.get<ProfileController>(ProfileController)
    service = module.get<ProfileService>(ProfileService)
    educationRepository = module.get<Repository<Education>>(getRepositoryToken(Education));

    const userRepository: Repository<User> = module.get(getRepositoryToken(User));
    const user: User = new User
    user.firstName = 'test'
    user.lastName = 'test'
    user.email = 'test@test.ca'
    user.password = 'test'
    user.gender = 'male'
    loggedInUser = await createTestBearerPayload(user.email,
      userRepository);


  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it(`should be protected with JwtAuthGuard.`, async () => {
    expect(isGuarded(ProfileController.prototype.addEducation, JwtAuthGuard)).toBe(true)
    expect(isGuarded(ProfileController.prototype.deleteEducation, JwtAuthGuard)).toBe(true)
    expect(isGuarded(ProfileController.prototype.editEdication, JwtAuthGuard)).toBe(true)

    expect(isGuarded(ProfileController.prototype.addProject, JwtAuthGuard)).toBe(true)
    expect(isGuarded(ProfileController.prototype.deleteProject, JwtAuthGuard)).toBe(true)
    expect(isGuarded(ProfileController.prototype.editProject, JwtAuthGuard)).toBe(true)

    expect(isGuarded(ProfileController.prototype.addAward, JwtAuthGuard)).toBe(true)
    expect(isGuarded(ProfileController.prototype.deleteAward, JwtAuthGuard)).toBe(true)
    expect(isGuarded(ProfileController.prototype.editAward, JwtAuthGuard)).toBe(true)

    expect(isGuarded(ProfileController.prototype.addSkill, JwtAuthGuard)).toBe(true)
    expect(isGuarded(ProfileController.prototype.deleteSkill, JwtAuthGuard)).toBe(true)
    expect(isGuarded(ProfileController.prototype.editSkill, JwtAuthGuard)).toBe(true)

    expect(isGuarded(ProfileController.prototype.addLanguage, JwtAuthGuard)).toBe(true)
    expect(isGuarded(ProfileController.prototype.deleteLanguage, JwtAuthGuard)).toBe(true)
    expect(isGuarded(ProfileController.prototype.editLanguage, JwtAuthGuard)).toBe(true)

    expect(isGuarded(ProfileController.prototype.addProject, JwtAuthGuard)).toBe(true)
    expect(isGuarded(ProfileController.prototype.deleteProject, JwtAuthGuard)).toBe(true)
    expect(isGuarded(ProfileController.prototype.editProject, JwtAuthGuard)).toBe(true)
  })

  it('should successfully post an education to the authenticated user', async () => {
    let test = new Profile.AddEducationRequest
    const education: Profile.AddEducationRequest = new Profile.AddEducationRequest()
    education.institution = 'Concordia'
    education.degree = 'Bachelor'
    education.start_year = 2014
    education.end_year = 202

    // tslint:disable-next-line: no-invalid-await
    expect(await controller.addEducation(loggedInUser, education)).toBe(null);
  })
})
