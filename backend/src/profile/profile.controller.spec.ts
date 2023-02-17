import { Test, type TestingModule } from '@nestjs/testing'
import { ProfileController } from './profile.controller'
import { ProfileService } from './profile.service'

describe('ProfileController', () => {
  let controller: ProfileController
  
  let mockProfileService = {}


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController],
      providers: [
        ProfileService
      ]
    }).overrideProvider(ProfileService).useValue(mockProfileService)
    .compile()

    controller = module.get<ProfileController>(ProfileController)
    
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
