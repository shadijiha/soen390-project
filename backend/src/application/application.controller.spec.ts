import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Application } from "../models/application.entity";
import { Repository } from "typeorm";
import { Job } from "../models/job.entity";
import { ApplicationController } from "./application.controller";
import { ApplicationService } from "./application.service";

describe("ApplicationController", () => {
  let controller: ApplicationController;

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
      controllers: [ApplicationController],
    }).compile();

    controller = module.get<ApplicationController>(ApplicationController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
