import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Job } from '../models/job.entity';
import { Repository } from 'typeorm';
import { Recruiter } from '../models/user_types/recruiter.entity';
import { JobsService } from './jobs.service';


describe('JobsService', () => {
  let service: JobsService;
  const recruiterRepository = createMock<Repository<Recruiter>>()
  const jobsRepository = createMock<Repository<Job>>()

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobsService,
        {
          provide: getRepositoryToken(Recruiter),
          useValue: recruiterRepository
        },
        {
          provide: getRepositoryToken(Job),
          useValue: jobsRepository
        },
      ],
    }).compile();

    service = module.get<JobsService>(JobsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
