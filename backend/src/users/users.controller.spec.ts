import { Test, type TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { dataSourceMockFactory } from "../util/mockDataSource";
import { DataSource, Repository } from "typeorm";
import { User } from "../models/user.entity";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { ConnectionsService } from "./connections/connections.service";
import { Connection } from "../models/connection.entity";
import { createTestBearerPayload, type BearerPayload } from "../util/util";
import { Users } from "./users.types";

describe("UsersController", () => {
  let controller: UsersController;
  let userRepository: Repository<User>;

  let mockUserService = {
    findAll: jest.fn(() => []),
    findOne: jest.fn(() => {}),
    update: jest.fn(() => ({ id: 1, firstName: "Test" })),
    getByEmail: jest.fn(() => {}),

    removeSoft: jest.fn((id) => {
      if (id == 1) return true;
      else throw new Error();
    }),

    findOneById: jest.fn((id) => {
      if (id == 1) return { user: { id: 1, email: "test@gmail.com" } };
      else return null;
    }),

    search: jest.fn(() => ({})),
  };

  let mockConnectionService = {
    getConnectionStatus: jest.fn(() => {}),
    getAcceptedConnections: jest.fn(() => {}),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        ConnectionsService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn(() => []),
            findOne: jest.fn(() => {}),
          },
        },
        {
          provide: getRepositoryToken(Connection),
          useValue: {},
        },
        { provide: DataSource, useFactory: dataSourceMockFactory },
      ],
      controllers: [UsersController],
    })
      .overrideProvider(ConnectionsService)
      .useValue(mockConnectionService)
      .overrideProvider(UsersService)
      .useValue(mockUserService)
      .compile();

    controller = module.get<UsersController>(UsersController);
    userRepository = module.get(getRepositoryToken(User));
  });
  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should return all users", async () => {
    const allUsers = await controller.findAll();
    expect(mockUserService.findAll).toHaveBeenCalled();
  });

  it("should return user by id", async () => {
    const bearer: BearerPayload = { email: "test@gmail.com", id: 1 } as BearerPayload;
    const allUsers = await controller.findOne(1, bearer);

    expect(mockUserService.findOneById).toHaveBeenCalled();
  });

  it("should return user by id throw error", async () => {
    const bearer: BearerPayload = { email: "test@gmail.com", id: 1 } as BearerPayload;
    try {
      await controller.findOne(2, bearer);
    } catch (e) {
      expect(e.message).toEqual("User not found");
    }

    expect(mockUserService.findOneById).toHaveBeenCalled();
  });

  it("should update user", async () => {
    const bearer: BearerPayload = { email: "test@gmail.com", id: 1 } as BearerPayload;
    const body = {
      firstName: "Test",
      lastName: "",
      email: "",
      mobileNo: "",
      gender: "",
      biography: "",
    } as Users.UpdateUserRequest;
    const files = {};

    const updatedUser = await controller.update(bearer, body, files);
    expect(mockUserService.update).toHaveBeenCalled();
    expect(updatedUser.firstName).toEqual("Test");
  });

  it("should return user or company according to query", async () => {
    const bearer: BearerPayload = await createTestBearerPayload("test@gmail.com", userRepository);
    const query = "test";

    await controller.search(bearer, query);
    expect(mockUserService.search).toHaveBeenCalled();
  });

  // it('should return logged in user', async () => {
  //   const bearer: BearerPayload = await createTestBearerPayload('test@gmail.com', userRepository)
  //   const loggedInUser = await controller.me(bearer)
  //   expect(service.getByEmail).toHaveBeenCalled
  // })

  // it('should return updated user', async () => {
  //   const bearer: BearerPayload = await createTestBearerPayload('test@gmail.com', userRepository)
  //   const body: Users.UpdateUserRequest = {
  //     firstName: 'Test',
  //     lastName: null,
  //     email: null,
  //     gender: null,
  //     mobileNo: "",
  //     biography: "",
  //     educations: [],
  //     workExperience: [],
  //     volunteeringExperience: [],
  //     connections: [],
  //     skills: [],
  //     recommendationsGiven: [],
  //     recommendationsReceived: [],
  //     courses: [],
  //     projects: [],
  //     awards: [],
  //     languages: []
  //   }
  //   const updatedUser = await controller.update(bearer, body)
  //   expect(service.update).toHaveBeenCalled
  // })

  it("should delete logged in user", async () => {
    //   const bearer: BearerPayload = await createTestBearerPayload('test@gmail.com', userRepository)
    const bearer: BearerPayload = { email: "test@gmail.com", id: 1 } as BearerPayload;

    const deletedUser = await controller.remove(bearer);
    expect(mockUserService.removeSoft).toHaveBeenCalled();
  });

  it("should throw error when deleting user", async () => {
    const bearer: BearerPayload = await createTestBearerPayload("test@gmail.com", userRepository);

    try {
      expect(await controller.remove(bearer)).toThrowError();
    } catch (e) {}

    expect(mockUserService.removeSoft).toHaveBeenCalled();
  });
});
