import { Test, type TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../models/user.entity";
import { ProfileController } from "./profile.controller";
import { ProfileService } from "./profile.service";
import { BearerPayload, createTestBearerPayload } from "../util/util";
import { Profile } from "./profile.types";

describe("ProfileController", () => {
  let controller: ProfileController;
  let service: ProfileService;
  let userRepository: Repository<User>;

  let mockProfileService = {
    addEducation: jest.fn(),
    editEducation: jest.fn(),
    deleteEducation: jest.fn(),
    addCourse: jest.fn(),
    editCourse: jest.fn(),
    removeCourse: jest.fn(),
    addProject: jest.fn(),
    editProject: jest.fn(),
    removeProject: jest.fn(),
  };

  const mockUsersRepository = {
    findOne: jest.fn(() => {}),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController],
      providers: [
        ProfileService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository,
        },
      ],
    })
      .overrideProvider(ProfileService)
      .useValue(mockProfileService)
      .compile();

    controller = module.get<ProfileController>(ProfileController);
    service = module.get<ProfileService>(ProfileService);
    userRepository = module.get(getRepositoryToken(User));
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should add education to the authenticated user", async () => {
    const bearer: BearerPayload = await createTestBearerPayload("test@gmail.com", userRepository);

    const data: Profile.AddEducationRequest = new Profile.AddEducationRequest();
    data.institution = "Concordia";
    data.degree = "Bachelor";
    data.start_year = 2014;
    data.end_year = 2020;

    controller.addEducation(bearer, data);

    expect(mockProfileService.addEducation).not.toHaveBeenCalled();
  });

  it("should edit education", async () => {
    const bearer: BearerPayload = await createTestBearerPayload("test@gmail.com", userRepository);

    const data: Profile.EditEducationRequest = new Profile.EditEducationRequest();
    data.id = 1;
    data.institution = "Concordia";
    data.degree = "Bachelor";
    data.start_year = 2014;
    data.end_year = 2020;

    const user: User = {
      id: 1,
    } as User;

    jest.spyOn(bearer, "getUser").mockImplementation(() => Promise.resolve(user));

    controller.editEducation(bearer, data);
    expect(mockProfileService.editEducation).not.toHaveBeenCalled();
  });

  it("should delete education", async () => {
    const bearer: BearerPayload = await createTestBearerPayload("test@gmail.com", userRepository);
    const eduId = 1;

    controller.deleteEducation(bearer, eduId);
    expect(mockProfileService.deleteEducation).not.toHaveBeenCalled();
  });


  it("should add course to the authenticated user", async () => {
    const bearer: BearerPayload = await createTestBearerPayload("test@gmail.com", userRepository);

    const data: Profile.AddCourseRequest = new Profile.AddCourseRequest();
    data.courseName = "OS";
    data.courseNumber = "COMP 346";


    controller.addCourse(bearer, data);

    expect(mockProfileService.addCourse).not.toHaveBeenCalled();
  });


  it("should edit course", async () => {
    const bearer: BearerPayload = await createTestBearerPayload("test@gmail.com", userRepository);

    const data: Profile.EditCourseRequest = new Profile.EditCourseRequest();
    data.id = 1;
    data.courseName = "OS";
    data.courseNumber = "COMP 346";
    

    controller.editCourse(bearer, data);
    expect(mockProfileService.editCourse).not.toHaveBeenCalled();
  });

  it("should delete course", async () => {
    const bearer: BearerPayload = await createTestBearerPayload("test@gmail.com", userRepository);
    const courseId = 1;

    controller.deleteEducation(bearer, courseId);
    expect(mockProfileService.removeCourse).not.toHaveBeenCalled();
  });


  it("should add project to the authenticated user", async () => {
    const bearer: BearerPayload = await createTestBearerPayload("test@gmail.com", userRepository);

    const data: Profile.AddProjectRequest = new Profile.AddProjectRequest();
    data.description = "OS";
    data.end_year = 2020;
    data.start_year = 2019;
    data.url = ''


    controller.addProject(bearer, data);

    expect(mockProfileService.addProject).not.toHaveBeenCalled();
  });

  it("should edit project", async () => {
    const bearer: BearerPayload = await createTestBearerPayload("test@gmail.com", userRepository);

    const data: Profile.EditProjectRequest = new Profile.EditProjectRequest();
    data.id = 1;
    data.description = "Concordia";
   
    controller.editProject(bearer, data);
    expect(mockProfileService.editProject).not.toHaveBeenCalled();
  });

  it("should delete project", async () => {
    const bearer: BearerPayload = await createTestBearerPayload("test@gmail.com", userRepository);
    const projectId = 1;

    controller.deleteProject(bearer, projectId);
    expect(mockProfileService.removeProject).not.toHaveBeenCalled();
  });



});
