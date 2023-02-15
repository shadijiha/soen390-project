import { Test, type TestingModule } from '@nestjs/testing'
import { ProfileController } from './profile.controller'
import { ProfileService } from './profile.service'

describe('ProfileController', () => {
  let controller: ProfileController
  let service: ProfileService
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController],
      providers: [
        ProfileService
      ]
    }).compile()

    controller = module.get<ProfileController>(ProfileController)
    service = module.get<ProfileService>(ProfileService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
