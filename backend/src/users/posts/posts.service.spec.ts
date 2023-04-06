import { Test, TestingModule } from "@nestjs/testing";
import { PostsService } from "./posts.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Post } from "../../models/post.entity";
import { ConnectionsService } from "../connections/connections.service";
import { Connection } from "../../models/connection.entity";
import { PusherService } from "../../util/pusher/pusher.service";
import { UsersService } from "../users.service";
import { User } from "../../models/user.entity";
import { Job } from "../../models/job.entity";
import { DataSource, Repository } from "typeorm";
import { dataSourceMockFactory } from "../../util/mockDataSource";
import { createTestBearerPayload } from "../../util/util";
import { Posts } from "./posts.types";

describe("PostsService", () => {
  let service: PostsService;
  let userRepository: Repository<User>;

  let mockPostsRepository = {
    save: jest.fn(() => {
      return { id: 1, content: "test" } as Post;
    }),
  };

  let mockConnectionsRepository = {};

  let mockUsersRepository = {
    findOne: jest.fn((x) => {
      if (x.where.email == "") return null;
      if (x.where.email == "roger@gmail.com") return { id: 1, type: "user", jobs: [] };
    }),
  };

  let mockJobsRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        ConnectionsService,
        PusherService,
        UsersService,
        {
          provide: getRepositoryToken(Post),
          useValue: mockPostsRepository,
        },
        {
          provide: getRepositoryToken(Connection),
          useValue: mockConnectionsRepository,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository,
        },
        {
          provide: getRepositoryToken(Job),
          useValue: mockJobsRepository,
        },
        { provide: DataSource, useFactory: dataSourceMockFactory },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
    userRepository = module.get(getRepositoryToken(User));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should create a post", async () => {
    const bearer = await createTestBearerPayload("roger@gmail.com", userRepository);
    const post: Posts.CreatePostDto = {
      content: "test",
    } as Posts.CreatePostDto;

    const files = {};

    const result = await service.createPost(bearer, post, files);
    expect(mockPostsRepository.save).toHaveBeenCalled();
  });
});
