import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "../models/user.entity";
import { BearerPayload, createTestBearerPayload } from "../util/util";
import { Repository } from "typeorm";
import { JobsController } from "./jobs.controller";
import { JobsService } from "./jobs.service";
import { Jobs } from "./jobs.types";
import { NotFoundException } from "@nestjs/common";

describe("JobsController", () => {
  let controller: JobsController;
  let userRepository: Repository<User>;

  let mockJobsService = {
    createJob: jest.fn(() => { }),
    updateJob: jest.fn(() => { }),
    deleteJob: jest.fn(() => { }),
    getJobById: jest.fn(() => { }),
    getAllJobs: jest.fn(() => { }),
    getApplicationsForMyJobs: jest.fn(() => { }),
  };

  let mockUsersRepository = {
    findOne: jest.fn((x) => {
      if (x.where.email == "") return null;
      if (x.where.email == "test@gmail.com") return { id: 1, type: "recruiter", jobs: [] };
      if (x.where.email == "error@gmail.com") return { id: 1, type: "jobseeker", jobs: [] };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobsController],
      providers: [
        JobsService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository,
        },
      ],
    })
      .overrideProvider(JobsService)
      .useValue(mockJobsService)
      .compile();

    controller = module.get<JobsController>(JobsController);
    userRepository = module.get(getRepositoryToken(User));
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should create a job post", async () => {
    let bearer: BearerPayload = await createTestBearerPayload("", userRepository);
    const job: Jobs.AddJobRequest = {
      jobTitle: "test",
      companyName: "test",
      location: "test",
      jobDescription: "test",
      salary: "100",
      jobType: "full-time",
      startDate: new Date(),
      coverLetter: true,
      transcript: true,
      externalUrl: "",
      skills: "test",
      tempFunction: function () {
        throw new Error("Function not implemented.");
      },
    };
    await controller.createJob(bearer, job);

    bearer = await createTestBearerPayload("test@gmail.com", userRepository);

    await controller.createJob(bearer, job);
    expect(mockJobsService.createJob).toHaveBeenCalled();

    bearer = await createTestBearerPayload("error@gmail.com", userRepository);
    try {
      await controller.createJob(bearer, job);
    } catch (e) {
      expect(e.message).toBe("Only recruiters can create job posts");
    }
  });

  it("should get all jobs listings for a recruiter", async () => {
    let bearer: BearerPayload = await createTestBearerPayload("", userRepository);
    try {
      await controller.getJobs(bearer);
    } catch (e) {
      expect(e.message).toBe("Recruiters does not exist");
    }

    bearer = await createTestBearerPayload("test@gmail.com", userRepository);
    expect(await controller.getJobs(bearer)).toBeInstanceOf(Array);

    bearer = await createTestBearerPayload("error@gmail.com", userRepository);

    try {
      await controller.getJobs(bearer);
    } catch (e) {
      expect(e.message).toBe("Only recruiters can have job posts");
    }
  });

  it("should get all jobs listings.", async () => {
    let bearer: BearerPayload = await createTestBearerPayload("", userRepository);
    try {
      await controller.getAllJobs(bearer);
    } catch (e) {
      expect(mockJobsService.getAllJobs).toHaveBeenCalled();
    }
  });

  it("should get a job listing by id", async () => {
    await controller.getJobById("1");
    expect(mockJobsService.getJobById).toHaveBeenCalled();

    jest.spyOn(mockJobsService, "getJobById").mockImplementation(() => {
      throw new NotFoundException();
    });

    try {
      await controller.getJobById("1");
    } catch (e) {
      expect(e.message).toBe("Job does not exist");
    }
  });

  it("should update job post", async () => {
    let bearer: BearerPayload = await createTestBearerPayload("", userRepository);
    const job: Jobs.UpdateJobRequest = {
      jobTitle: "test",
      companyName: "test",
      location: "test",
      jobDescription: "test",
      salary: "100",
      jobType: "full-time",
      startDate: new Date(),
      coverLetter: true,
      transcript: true,
      skills: "test",
      externalUrl: "test",
      tempFunction: function () {
        throw new Error("Function not implemented.");
      },
    };

    await controller.updateJob(bearer, job, "1");
    bearer = await createTestBearerPayload("test@gmail.com", userRepository);
    await controller.updateJob(bearer, job, "1");
    expect(mockJobsService.updateJob).toHaveBeenCalled();

    bearer = await createTestBearerPayload("error@gmail.com", userRepository);

    try {
      await controller.updateJob(bearer, job, "1");
    } catch (e) {
      expect(e.message).toBe("Only recruiters can update job posts");
    }
  });

  it("should delete job post", async () => {
    let bearer: BearerPayload = await createTestBearerPayload("", userRepository);
    await controller.deleteJob(bearer, "1");

    bearer = await createTestBearerPayload("test@gmail.com", userRepository);
    await controller.deleteJob(bearer, "1");
    expect(mockJobsService.deleteJob).toHaveBeenCalled();

    bearer = await createTestBearerPayload("error@gmail.com", userRepository);

    try {
      await controller.deleteJob(bearer, "1");
    } catch (e) {
      expect(e.message).toBe("Only recruiters can delete job posts");
    }
  });

  it("should get all applications for a job listing for a recruiter", async () => {
    const bearer = await createTestBearerPayload("test@gmail.com", userRepository);
    await controller.getApplicationsForMyJobs(bearer);
    expect(mockJobsService.getApplicationsForMyJobs).toHaveBeenCalled();
  });
});
