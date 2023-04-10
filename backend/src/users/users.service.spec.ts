import { Test, type TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "../models/user.entity";
import { dataSourceMockFactory } from "../util/mockDataSource";
import { DataSource, DeleteResult, type Repository } from "typeorm";
import { UsersService } from "./users.service";
import { Users } from "./users.types";
import { Job } from "../models/job.entity";
import Pusher from "pusher";
import { PusherService } from "../util/pusher/pusher.service";

describe("UsersService", () => {
  let service: UsersService;
  let userRepository: Repository<User>;
  const mockUser: User = new User();
  mockUser.id = 1;
  mockUser.email = "test@gmail.com";
  mockUser.password = "123";
  mockUser.firstName = "test";
  mockUser.lastName = "test";
  mockUser.gender = "male";
  const updatedUser = new Users.UpdateUserRequest();
  updatedUser.email = "updated@gmail.com";
  const deletedResult: DeleteResult = new DeleteResult();
  deletedResult.affected = 1;
  let mockUsersRepository = {
    find: jest.fn(() => []),
    findOneBy: jest.fn(() => mockUser),
    findOneByOrFail: jest.fn(() => mockUser),
    findOneOrFail: jest.fn(() => mockUser),
    findOne: jest.fn(() => mockUser),
    save: jest.fn(() => mockUser),
    update: jest.fn(() => updatedUser),
    delete: jest.fn(() => deletedResult),
    softRemove: jest.fn(() => null),
  };
  let mockJobsRepository = {
    find: jest.fn(() => []),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        PusherService,
        {
          provide: getRepositoryToken(User),
          // define a fake repository that returns the fake users
          useValue: mockUsersRepository,
        },
        {
          provide: getRepositoryToken(Job),
          useValue: mockJobsRepository,
        },

        { provide: DataSource, useFactory: dataSourceMockFactory },
      ],
    }).compile();
    service = module.get<UsersService>(UsersService);
    userRepository = module.get(getRepositoryToken(User));
  });
  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return all users", async () => {
    const allUsers = await service.findAll();
    expect(allUsers.length).toEqual(0);
  });

  it("should return a user by id", async () => {
    const user = await service.findOneById(1);
    expect(user.id).toEqual(1);
  });

  it("should return a user by id with no relations", async () => {
    const user = await service.findOneByIdNoRelations(1);
    expect(user.id).toEqual(1);
  });

  it("should return a user by email", async () => {
    const result = await service.getByEmail("test@gmail.com");
    expect(result.email).toEqual("test@gmail.com");
  });
  it("should return a user by email", async () => {
    const result = await service.findOneByEmail("test@gmail.com");
    expect(result?.email).toEqual("test@gmail.com");
  });

  it("should return created user", async () => {
    const result = await service.create(mockUser);
    expect(result.email).toEqual("test@gmail.com");
  });

  it("should return updated user", async () => {
    const result = await service.update(1, updatedUser, { profilePic: undefined, coverPic: undefined });
    expect(result.email).toEqual("updated@gmail.com");
  });

  // remove user
  it("should soft delete user", async () => {
    const result = await service.removeSoft(1);
    expect(mockUsersRepository.softRemove).toHaveBeenCalled();
  });

  it("should return search results", async () => {
    const result = await service.search(null, "test");
    expect(mockUsersRepository.find).toHaveBeenCalled();
  });

  it("should get user status", async () => {
    const result = await service.getStatus(1);
    expect(mockUsersRepository.findOneOrFail).toHaveBeenCalled();
  });

  it("should add documents", async () => {
    //   const user: User = new User();
    //   const cvFile = { buffer: Buffer.from('test cv data'), mimetype: 'application/pdf' } as Express.Multer.File;
    //   const coverLetterFile = { buffer: Buffer.from('test cover letter data'), mimetype: 'text/plain' } as Express.Multer.File;
    //   const files = { cv: cvFile, coverLetter: coverLetterFile };
    //   const result = await service.addDocuments(user, {cv: [cvFile], coverLetter: coverLetterFile});
    //   expect(mockUsersRepository.save).toHaveBeenCalled();
  });

  it("should remove documents", async () => {
    const user: User = new User();
    const result = await service.removeDocuments(user, { cv: true, coverLetter: true });
    expect(mockUsersRepository.save).toHaveBeenCalled();
  });

  it("should delete profile picture", async () => {
    await service.removeProfilePic(1);
    expect(mockUsersRepository.findOneOrFail).toHaveBeenCalled();
  });

  it("should delete cover picture", async () => {
    await service.removeCoverPic(1);
    expect(mockUsersRepository.findOneOrFail).toHaveBeenCalled();
  });

});
