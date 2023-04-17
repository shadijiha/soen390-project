import { Test, TestingModule } from "@nestjs/testing";
import { AdminService } from "./admin.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Reported } from "../models/reported.entity";
import { User } from "../models/user.entity";
import { Notifications } from "../models/notifications.entity";
import { Message } from "../models/message.entity";
import { Post } from "../models/post.entity";
import { NotificationsService } from "../users/notifications/notifications.service";
import { PusherService } from "../util/pusher/pusher.service";

describe("AdminService", () => {
  let service: AdminService;

  let mockReportedRepository = {
    findOneBy: jest.fn(() => {
      return {
        id: 1,
        type: "test",
        status: "test",
      } as unknown as Reported;
    }),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(() => {
      return {
        id: 1,
        type: "test",
        status: "test",
        reporter: {
          id: 1,
          fullName: "test",
        },
        reported: {
          id: 1,
          fullName: "test",
        },
      } as unknown as Reported;
    }),
    softRemove: jest.fn(),
  };

  let mockUserRepository = {
    findOneBy: jest.fn(() => {
      return {
        id: 1,
        fullName: "test",
        profilePic: "test",
      } as User;
    }),
    softRemove: jest.fn(),
    findOne: jest.fn(() => {
      return {
        id: 1,
        fullName: "test",
        profilePic: "test",
      } as User;
    }),
    save: jest.fn(),
  };

  let mockNotificationRepository = {
    save: jest.fn(),
  };

  let mockMessageRepository = {
    findOneBy: jest.fn(() => {
      return {
        id: 1,
        message: "test",
        user: {
          id: 1,
          fullName: "test",
          profilePic: "test",
        },
      } as unknown as Message;
    }),
  };

  let mockPostsRepository = {
    findOne: jest.fn(() => {
      return {
        id: 1,
        user: {
          id: 1,
          fullName: "test",
          profilePic: "test",
        },
      } as Post;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminService,
        NotificationsService,
        PusherService,
        {
          provide: getRepositoryToken(Reported),
          useValue: mockReportedRepository,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: getRepositoryToken(Notifications),
          useValue: mockNotificationRepository,
        },
        {
          provide: getRepositoryToken(Message),
          useValue: mockMessageRepository,
        },
        {
          provide: getRepositoryToken(Post),
          useValue: mockPostsRepository,
        },
      ],
    }).compile();

    service = module.get<AdminService>(AdminService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should report a post", async () => {
    const user: User = new User();
    jest.spyOn(mockReportedRepository, "findOneBy").mockReturnValue(null as any);
    const result = await service.reportPost("1", user);

    expect(mockReportedRepository.save).toHaveBeenCalled();
  });

  it("should report a message", async () => {
    const user: User = new User();
    //jest.spyOn(mockReportedRepository, "findOneBy").mockReturnValue(null as any);
    const result = await service.reportMessage("1", user);

    expect(mockReportedRepository.save).toHaveBeenCalled();
  });

  it("should get all unresolved reported posts", async () => {
    const result = await service.getReportedPosts();

    expect(mockReportedRepository.find).toHaveBeenCalled();
  });

  it("should get all unresolved reported messages", async () => {
    const result = await service.getReportedMessages();

    expect(mockReportedRepository.find).toHaveBeenCalled();
  });

  it("should get all resolved reported posts", async () => {
    const result = await service.getResolvedPosts();

    expect(mockReportedRepository.find).toHaveBeenCalled();
  });

  it("should get all resolved reported messages", async () => {
    const result = await service.getResolvedMessages();

    expect(mockReportedRepository.find).toHaveBeenCalled();
  });

  it("should resolve a reported post as safe", async () => {

    jest.spyOn(mockReportedRepository, "findOneBy").mockReturnValue({
      id: 1,
      type: "test",
      status: "test",
    } as unknown as Reported);
    
    const result = await service.resolvePostSafe("1");
    
    expect(mockReportedRepository.findOneBy).toHaveBeenCalled();
  });

  it("should resolve a reported message as safe", async () => {
    const result = await service.resolveMessageSafe("1");

    expect(mockReportedRepository.findOneBy).toHaveBeenCalled();
  });

  it("should ban  user from post", async () => {
    const result = await service.banUserPost("1");

    expect(mockUserRepository.softRemove).toHaveBeenCalled();
  });

  it("should ban  user from message", async () => {
    const result = await service.banUserMessage("1");

    expect(mockUserRepository.softRemove).toHaveBeenCalled();
  });

  it("should unban user", async () => {
    const result = await service.unbanUser("1");

    expect(mockUserRepository.findOne).toHaveBeenCalled();
  });
});
