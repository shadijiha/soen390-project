import { Test, TestingModule } from "@nestjs/testing";
import { AdminController } from "./admin.controller";
import { UsersService } from "../users/users.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "../models/user.entity";
import { DataSource, Repository } from "typeorm";
import { dataSourceMockFactory } from "../util/mockDataSource";
import { Job } from "../models/job.entity";
import { PusherService } from "../util/pusher/pusher.service";
import { AdminService } from "./admin.service";
import { Message } from "../models/message.entity";
import { Post } from "../models/post.entity";
import { BearerPayload, createTestBearerPayload } from "../util/util";

describe("AdminController", () => {
  let controller: AdminController;
  let userRepository: Repository<User>;

  let mockUserRepository = {
    findOne: jest.fn(() => {
      return {
        id: 1,
        email: "",
        type: "admin",
      } as User;
    }),
  };
  let mockJobRepository = {};
  let mockMessageRepository = {};
  let mockPostsRepository = {};

  let mockAdminService = {
    reportPost: jest.fn(),
    reportMessage: jest.fn(),
    getReportedPosts: jest.fn(),
    getReportedMessages: jest.fn(),
    getResolvedPosts: jest.fn(),
    getResolvedMessages: jest.fn(),
    resolvePostSafe: jest.fn(),
    resolveMessageSafe: jest.fn(),
    removePost: jest.fn(),
    removeMessage: jest.fn(),
    banUserPost: jest.fn(),
    banUserMessage: jest.fn(),
    unbanUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        PusherService,
        AdminService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: getRepositoryToken(Job),
          useValue: mockJobRepository,
        },
        {
          provide: getRepositoryToken(Message),
          useValue: mockMessageRepository,
        },
        {
          provide: getRepositoryToken(Post),
          useValue: mockPostsRepository,
        },

        { provide: DataSource, useFactory: dataSourceMockFactory },
      ],
      controllers: [AdminController],
    })
      .overrideProvider(AdminService)
      .useValue(mockAdminService)
      .compile();

    controller = module.get<AdminController>(AdminController);
    userRepository = module.get(getRepositoryToken(User));
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should report a post", async () => {
    const bearer: BearerPayload = await createTestBearerPayload("test@gmail.com", userRepository);
    const result = await controller.reportPost("1", bearer);

    expect(mockAdminService.reportPost).toHaveBeenCalled();
  });

  it("should report a post", async () => {
    const bearer: BearerPayload = await createTestBearerPayload("test@gmail.com", userRepository);
    const result = await controller.reportMessage("1", bearer);

    expect(mockAdminService.reportMessage).toHaveBeenCalled();
  });

  it("should get reported posts", async () => {
    const bearer: BearerPayload = await createTestBearerPayload("test@gmail.com", userRepository);
    const result = await controller.getReportedPosts(bearer);

    expect(mockAdminService.getReportedPosts).toHaveBeenCalled();
  });


  it("should get reported messages", async () => {
    const bearer: BearerPayload = await createTestBearerPayload("test@gmail.com", userRepository);
    const result = await controller.getReportedMessages(bearer);

    expect(mockAdminService.getReportedMessages).toHaveBeenCalled();
  });

  it('should get resolved posts', async () => {
    const bearer: BearerPayload = await createTestBearerPayload('test@gmail.com', userRepository);
    const result = await controller.getResolvedPosts(bearer);
    expect(mockAdminService.getResolvedPosts).toHaveBeenCalled();
  });
    
  it('should get resolved messages', async () => {
    const bearer: BearerPayload = await createTestBearerPayload('test@gmail.com', userRepository);
    const result = await controller.getResolvedMessages(bearer);
    expect(mockAdminService.getResolvedMessages).toHaveBeenCalled();
  });

  it('should resolve post', async () => {
    const bearer: BearerPayload = await createTestBearerPayload('test@gmail.com', userRepository);
    const result = await controller.resolvePost('1', bearer);
    expect(mockAdminService.resolvePostSafe).toHaveBeenCalled();
  });

  it('should resolve message', async () => {
    const bearer: BearerPayload = await createTestBearerPayload('test@gmail.com', userRepository);
    const result = await controller.resolveMessage('1', bearer);
    expect(mockAdminService.resolveMessageSafe).toHaveBeenCalled();
  });


  it('should remove post', async () => {
    const bearer: BearerPayload = await createTestBearerPayload('test@gmail.com', userRepository);
    const result = await controller.removePost('1', bearer);
    expect(mockAdminService.removePost).toHaveBeenCalled();
  });

  it('should remove message', async () => {
    const bearer: BearerPayload = await createTestBearerPayload('test@gmail.com', userRepository);
    const result = await controller.removeMessage('1', bearer);
    expect(mockAdminService.removeMessage).toHaveBeenCalled();
  });

  it('should ban post', async () => {
    const bearer: BearerPayload = await createTestBearerPayload('test@gmail.com', userRepository);
    const result = await controller.BanPost('1', bearer);
    expect(mockAdminService.banUserPost).toHaveBeenCalled();
  });

  it('should ban message', async () => {
    const bearer: BearerPayload = await createTestBearerPayload('test@gmail.com', userRepository);
    const result = await controller.BanMessage('1', bearer);
    expect(mockAdminService.banUserMessage).toHaveBeenCalled();
  });

  it('should unban user', async () => {
    const bearer: BearerPayload = await createTestBearerPayload('test@gmail.com', userRepository);
    const result = await controller.unbanUser('1', bearer);
    expect(mockAdminService.unbanUser).toHaveBeenCalled();
  });


});
