import { Test, TestingModule } from "@nestjs/testing";
import { PostsController } from "./posts.controller";
import { PostsService } from "./posts.service";
import { createTestBearerPayload } from "../../util/util";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "../../models/user.entity";
import { Repository } from "typeorm";
import { Posts } from "./posts.types";
import { PusherService } from "../../util/pusher/pusher.service";

describe("PostsController", () => {
  let controller: PostsController;
  let userRepository: Repository<User>;

  let mockPostsService = {
    createPost: jest.fn(() => {}),
    deletePost: jest.fn(() => {}),
    getFeed: jest.fn(() => {}),
  };

  let mockUsersRepository = {
    findOne: jest.fn((x) => {
      if (x.where.email == "") return null;
      if (x.where.email == "test@gmail.com") return { id: 1, type: "user", jobs: [] };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        PostsService,
        PusherService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository,
        },
      ],
    })
      .overrideProvider(PostsService)
      .useValue(mockPostsService)
      .compile();

    controller = module.get<PostsController>(PostsController);
    userRepository = module.get(getRepositoryToken(User));
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should create a post", async () => {
    const bearer = await createTestBearerPayload("test@gmail.com", userRepository);
    const post: Posts.CreatePostDto = {
      content: "test",
    } as Posts.CreatePostDto;

    const files = {};

    await controller.createPost(bearer, post, files);
    expect(mockPostsService.createPost).toHaveBeenCalled();
  });

  it("delete a post", async () => {
    const bearer = await createTestBearerPayload("test@gmail.com", userRepository);
    const postId = 1;
    await controller.deletePost(bearer, postId);
    expect(mockPostsService.deletePost).toHaveBeenCalled();
  });

  it("should get feed", async () => {
    const bearer = await createTestBearerPayload("test@gmail.com", userRepository);
    await controller.getFeed(bearer);
    expect(mockPostsService.getFeed).toHaveBeenCalled();
  });
});
