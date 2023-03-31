import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Application } from "../models/application.entity";
import { Repository } from "typeorm";
import { Job } from "../models/job.entity";
import { ApplicationController } from "./application.controller";
import { ApplicationService } from "./application.service";
import { createTestBearerPayload } from "../util/util";
import { User } from "../models/user.entity";
import { Applications } from "./applications.types";

describe("ApplicationController", () => {
  let controller: ApplicationController;
  let userRepository: Repository<User>;

  let mockJobRepository = {};
  let mockApplicationRepository = {};

  let mockJobsService = {
    postApplication: jest.fn(() => {}),
    deleteApplication: jest.fn(() => {}),
    getMyApplications: jest.fn(() => {}),
  };

  let mockUsersRepository = {
    findOne: jest.fn((x) => {
      if (x.where.email == "") return null;
      if (x.where.email == "test@gmail.com") return { id: 1, type: "User", jobs: [] };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApplicationService,
        {
          provide: getRepositoryToken(Job),
          useValue: mockJobRepository,
        },
        {
          provide: getRepositoryToken(Application),
          useValue: mockApplicationRepository,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository,
        },
      ],
      controllers: [ApplicationController],
    })
      .overrideProvider(ApplicationService)
      .useValue(mockJobsService)
      .compile();

    controller = module.get<ApplicationController>(ApplicationController);
    userRepository = module.get(getRepositoryToken(User));
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should post an application", async () => {
    const bearer = await createTestBearerPayload("test@gmail.com", userRepository);
    const application: Applications.AddApplicationRequest = {
      name: "test",
      email: "test",
    } as Applications.AddApplicationRequest;

    const files = {};

    await controller.postApplication("1", bearer, application, files);
    expect(mockJobsService.postApplication).toHaveBeenCalled();
  });

  it("should delete an application", async () => {
    const bearerNull = await createTestBearerPayload("", userRepository);
    const applicationId = "1";

    await controller.deleteApplication(applicationId, bearerNull);
    expect(mockJobsService.deleteApplication).not.toHaveBeenCalled();

    const bearer = await createTestBearerPayload("test@gmail.com", userRepository);

    await controller.deleteApplication(applicationId, bearer);
    expect(mockJobsService.deleteApplication).toHaveBeenCalled();
  });

  it("should get my job applications", async () => {
    const bearerNull = await createTestBearerPayload("", userRepository);
    await controller.getMyApplications(bearerNull);
    expect(mockJobsService.getMyApplications).not.toHaveBeenCalled();

    const bearer = await createTestBearerPayload("test@gmail.com", userRepository);
    await controller.getMyApplications(bearer);
    expect(mockJobsService.getMyApplications).toHaveBeenCalled();
  });
});
