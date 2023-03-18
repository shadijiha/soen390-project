import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Application } from "../models/application.entity";
import { Repository } from "typeorm";
import { Job } from "../models/job.entity";
import { ApplicationService } from "./application.service";

describe("ApplicationService", () => {
  let service: ApplicationService;

  let mockJobRepository = {};
  let mockApplicationRepository = {};

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
      ],
    }).compile();

    service = module.get<ApplicationService>(ApplicationService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
