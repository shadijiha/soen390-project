import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Job } from "../models/job.entity";
import { Recruiter } from "../models/user_types/recruiter.entity";
import { JobsService } from "./jobs.service";
import { Jobs } from "./jobs.types";

import { Skill } from "../models/skill.entity";
import { User } from "../models/user.entity";

describe("JobsService", () => {
  let service: JobsService;
  let mockUserRepository = {
    save: jest.fn(),
    update: jest.fn(),
  };

  let mockjobsRepository = {
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    find: jest.fn(),
    findOneOrFail: jest.fn(() => {
      return {
        id: 1,
        jobTitle: "Software Engineer",
        skills: ["Java", "C++", "Python"],
      } as unknown as Job;
    }),
  };

  let mockSkillRepository = {
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    find: jest.fn(() => ["Java", "C++", "Python"]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobsService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: getRepositoryToken(Job),
          useValue: mockjobsRepository,
        },
        {
          provide: getRepositoryToken(Skill),
          useValue: mockSkillRepository,
        },
      ],
    }).compile();

    service = module.get<JobsService>(JobsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should create a job", async () => {
    let data: Jobs.AddJobRequest = {
      jobTitle: "Software Engineer",
      skills: "Java,C++,Python",
    } as unknown as Jobs.AddJobRequest;

    let recruiter: Recruiter = {
      id: 1,
      jobs: [],
    } as unknown as Recruiter;

    await service.createJob(data, recruiter);

    expect(mockUserRepository.save).toHaveBeenCalled();

    data = {
      jobTitle: "Software Engineer",
      skills: "",
    } as unknown as Jobs.AddJobRequest;

    await service.createJob(data, recruiter);
    expect(mockUserRepository.save).toHaveBeenCalled();
  });

  it("should update a job", async () => {
    let jobId = 1;
    let data: Jobs.UpdateJobRequest = {
      jobTitle: "Software Engineer",
      skills: "Java,C++,Python",
    } as unknown as Jobs.UpdateJobRequest;

    let recruiter: Recruiter = {
      id: 1,
      jobs: [],
    } as unknown as Recruiter;

    try {
      await service.updateJob(jobId, data, recruiter);
    } catch (e) {
      expect(e.message).toBe("Not Found");
    }

    recruiter = {
      id: 1,
      jobs: [
        {
          id: 1,
        },
      ],
    } as unknown as Recruiter;

    await service.updateJob(jobId, data, recruiter);
    expect(mockjobsRepository.save).toHaveBeenCalled();
    expect(mockjobsRepository.update).toHaveBeenCalled();

    data = {
      jobTitle: "Software Engineer",
      skills: "",
    } as unknown as Jobs.UpdateJobRequest;

    await service.updateJob(jobId, data, recruiter);
    expect(mockjobsRepository.save).toHaveBeenCalled();
  });

  it("should delete a job", async () => {
    let jobId = 1;
    let recruiter: Recruiter = {
      id: 1,
      jobs: [],
    } as unknown as Recruiter;

    try {
      await service.deleteJob(jobId, recruiter);
    } catch (e) {
      expect(e.message).toBe("Not Found");
    }

    recruiter = {
      id: 1,
      jobs: [
        {
          id: 1,
        },
      ],
    } as unknown as Recruiter;

    await service.deleteJob(jobId, recruiter);
    expect(mockjobsRepository.delete).toHaveBeenCalled();
  });

  it("should get all jobs", async () => {
    await service.getAllJobs();
    expect(mockjobsRepository.find).toHaveBeenCalled();
  });

  it("should get job by id", async () => {
    await service.getJobById(1);

    expect(mockjobsRepository.findOneOrFail).toHaveBeenCalled();

    jest.spyOn(mockjobsRepository, "findOneOrFail").mockImplementation(() => null as any);

    try {
      await service.getJobById(1);
    } catch (e) {
      expect(e.message).toBe("Not Found");
    }
  });

  it("should get all jobs with their applications", async () => {
    await service.getApplicationsForMyJobs(1);
    expect(mockjobsRepository.find).toHaveBeenCalled();
  });
});
