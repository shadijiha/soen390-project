import { Test, TestingModule } from '@nestjs/testing';
import { PusherService } from './pusher.service';

describe('PusherService', () => {
  let service: PusherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PusherService],
    }).compile();

    service = module.get<PusherService>(PusherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
