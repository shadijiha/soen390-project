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
  let userRepository: Repository<User>;

  let mockProfileService = {
    addEducation: jest.fn(),
    editEducation: jest.fn(() => {}),
    removeEducation: jest.fn(),
    addCourse: jest.fn(),
    editCourse: jest.fn(),
    removeCourse: jest.fn(),
    addProject: jest.fn(),
    editProject: jest.fn(),
    removeProject: jest.fn(),
    addVolunteering: jest.fn(),
    editvolunteering: jest.fn(),
    removeVolunteering: jest.fn(),
    addWork: jest.fn(),
    editWork: jest.fn(),
    removeWork: jest.fn(),
    addSkill: jest.fn(),
    editSkill: jest.fn(),
    removeSkill: jest.fn(),
    addLanguage: jest.fn(),
    editLanguage: jest.fn(),
    removeLanguage: jest.fn(),
    addAward: jest.fn(),
    editAward: jest.fn(),
    removeAward: jest.fn(),
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

    const user: User = {
      id: 1,
    } as User;

    jest.spyOn(bearer, "getUser").mockImplementation(() => Promise.resolve(user));

    controller.addEducation(bearer, data);

    expect(await mockProfileService.addEducation).toHaveBeenCalled();
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

    controller.editEducation(bearer, data);

    expect(await mockProfileService.editEducation).not.toHaveBeenCalled();

    jest.spyOn(bearer, "getUser").mockImplementation(() => Promise.resolve(user));

    controller.editEducation(bearer, data);

    expect(await mockProfileService.editEducation).toHaveBeenCalled();
  });

  it("should delete education", async () => {
    const bearer: BearerPayload = await createTestBearerPayload("test@gmail.com", userRepository);
    const eduId = 1;

    controller.deleteEducation(bearer, eduId);
    expect(mockProfileService.removeEducation).not.toHaveBeenCalled();

    const user: User = {
      id: 1,
    } as User;

    jest.spyOn(bearer, "getUser").mockImplementation(() => Promise.resolve(user));

    controller.deleteEducation(bearer, eduId);
    expect(await mockProfileService.removeEducation).toHaveBeenCalled();
  });

  it("should add course to the authenticated user", async () => {
    const bearer: BearerPayload = await createTestBearerPayload("test@gmail.com", userRepository);

    const data: Profile.AddCourseRequest = new Profile.AddCourseRequest();
    data.courseName = "OS";
    data.courseNumber = "COMP 346";

    controller.addCourse(bearer, data);

    expect(mockProfileService.addCourse).not.toHaveBeenCalled();

    const user: User = {
      id: 1,
    } as User;

    jest.spyOn(bearer, "getUser").mockImplementation(() => Promise.resolve(user));

    controller.addCourse(bearer, data);
    expect(await mockProfileService.addCourse).toHaveBeenCalled();
  });

  it("should edit course", async () => {
    const bearer: BearerPayload = await createTestBearerPayload("test@gmail.com", userRepository);

    const data: Profile.EditCourseRequest = new Profile.EditCourseRequest();
    data.id = 1;
    data.courseName = "OS";
    data.courseNumber = "COMP 346";

    controller.editCourse(bearer, data);
    expect(mockProfileService.editCourse).not.toHaveBeenCalled();

    const user: User = {
      id: 1,
    } as User;

    jest.spyOn(bearer, "getUser").mockImplementation(() => Promise.resolve(user));

    controller.editCourse(bearer, data);
    expect(await mockProfileService.editCourse).toHaveBeenCalled();
  });

  it("should delete course", async () => {
    const bearer: BearerPayload = await createTestBearerPayload("test@gmail.com", userRepository);
    const courseId = 1;

    controller.deleteEducation(bearer, courseId);
    expect(mockProfileService.removeCourse).not.toHaveBeenCalled();

    const user: User = {
      id: 1,
    } as User;

    jest.spyOn(bearer, "getUser").mockImplementation(() => Promise.resolve(user));

    controller.deleteCourse(bearer, courseId);
    expect(await mockProfileService.removeCourse).toHaveBeenCalled();
  });

  it("should add project to the authenticated user", async () => {
    const bearer: BearerPayload = await createTestBearerPayload("test@gmail.com", userRepository);

    const data: Profile.AddProjectRequest = new Profile.AddProjectRequest();
    data.description = "OS";
    data.end_year = 2020;
    data.start_year = 2019;
    data.url = "";

    controller.addProject(bearer, data);

    expect(mockProfileService.addProject).not.toHaveBeenCalled();

    const user: User = {
      id: 1,
    } as User;

    jest.spyOn(bearer, "getUser").mockImplementation(() => Promise.resolve(user));
    controller.addProject(bearer, data);
    expect(await mockProfileService.addProject).toHaveBeenCalled();
  });

  it("should edit project", async () => {
    const bearer: BearerPayload = await createTestBearerPayload("test@gmail.com", userRepository);

    const data: Profile.EditProjectRequest = new Profile.EditProjectRequest();
    data.id = 1;
    data.description = "Concordia";

    controller.editProject(bearer, data);
    expect(mockProfileService.editProject).not.toHaveBeenCalled();

    const user: User = {
      id: 1,
    } as User;

    jest.spyOn(bearer, "getUser").mockImplementation(() => Promise.resolve(user));

    controller.editProject(bearer, data);
    expect(await mockProfileService.editProject).toHaveBeenCalled();
  });

  it("should delete project", async () => {
    const bearer: BearerPayload = await createTestBearerPayload("test@gmail.com", userRepository);
    const projectId = 1;

    controller.deleteProject(bearer, projectId);
    expect(mockProfileService.removeProject).not.toHaveBeenCalled();

    const user: User = {
      id: 1,
    } as User;

    jest.spyOn(bearer, "getUser").mockImplementation(() => Promise.resolve(user));

    controller.deleteProject(bearer, projectId);
    expect(await mockProfileService.removeProject).toHaveBeenCalled();
  });

  it("should add volunteering to the authenticated user", async () => {
    const bearer: BearerPayload = await createTestBearerPayload("test@gmail.com", userRepository);

    const data: Profile.AddVolunteeringRequest = new Profile.AddVolunteeringRequest();
    data.company = "Concordia";
    data.title = "wtv";
    data.start_year = 2014;
    data.end_year = 2020;

    controller.addVolunteering(bearer, data);

    expect(mockProfileService.addVolunteering).not.toHaveBeenCalled();

    const user: User = {
      id: 1,
    } as User;

    jest.spyOn(bearer, "getUser").mockImplementation(() => Promise.resolve(user));

    controller.addVolunteering(bearer, data);
    expect(await mockProfileService.addVolunteering).toHaveBeenCalled();
  });

  it("should edit volunteering", async () => {
    const bearer: BearerPayload = await createTestBearerPayload("test@gmail.com", userRepository);

    const data: Profile.EditVolunteeringRequest = new Profile.EditVolunteeringRequest();
    data.id = 1;
    data.title = "Concordia";
    data.title = "tutor";

    controller.editVolunteering(bearer, data);
    expect(mockProfileService.editvolunteering).not.toHaveBeenCalled();

    const user: User = {
      id: 1,
    } as User;

    jest.spyOn(bearer, "getUser").mockImplementation(() => Promise.resolve(user));

    controller.editVolunteering(bearer, data);
    expect(await mockProfileService.editvolunteering).toHaveBeenCalled();
  });

  it("should delete volunteering", async () => {
    const bearer: BearerPayload = await createTestBearerPayload("test@gmail.com", userRepository);
    const projectId = 1;

    controller.deleteVolunteering(bearer, projectId);
    expect(mockProfileService.removeVolunteering).not.toHaveBeenCalled();

    const user: User = {
      id: 1,
    } as User;

    jest.spyOn(bearer, "getUser").mockImplementation(() => Promise.resolve(user));

    controller.deleteVolunteering(bearer, projectId);
    expect(await mockProfileService.removeVolunteering).toHaveBeenCalled();
  });

  it("should add work to the authenticated user", async () => {
    const bearer: BearerPayload = await createTestBearerPayload("test@gmail.com", userRepository);

    const data: Profile.AddWorkRequest = new Profile.AddWorkRequest();
    data.company = "Concordia";
    data.title = "wtv";
    data.start_year = 2014;
    data.end_year = 2020;

    controller.addVolunteering(bearer, data);

    expect(mockProfileService.addWork).not.toHaveBeenCalled();

    const user: User = {
      id: 1,
    } as User;

    jest.spyOn(bearer, "getUser").mockImplementation(() => Promise.resolve(user));

    controller.addWork(bearer, data);
    expect(await mockProfileService.addWork).toHaveBeenCalled();
  });

  it("should edit work", async () => {
    const bearer: BearerPayload = await createTestBearerPayload("test@gmail.com", userRepository);

    const data: Profile.EditSkillRequest = new Profile.EditSkillRequest();
    data.id = 1;
    data.title = "Concordia";
    data.title = "tutor";

    controller.editWork(bearer, data);
    expect(mockProfileService.editSkill).not.toHaveBeenCalled();

    const user: User = {
      id: 1,
    } as User;

    jest.spyOn(bearer, "getUser").mockImplementation(() => Promise.resolve(user));

    controller.editWork(bearer, data);
    expect(await mockProfileService.editWork).toHaveBeenCalled();
  });

  it("should delete work", async () => {
    const bearer: BearerPayload = await createTestBearerPayload("test@gmail.com", userRepository);
    const projectId = 1;

    controller.deleteWork(bearer, projectId);
    expect(mockProfileService.removeWork).not.toHaveBeenCalled();

    const user: User = {
      id: 1,
    } as User;

    jest.spyOn(bearer, "getUser").mockImplementation(() => Promise.resolve(user));

    controller.deleteWork(bearer, projectId);
    expect(await mockProfileService.removeWork).toHaveBeenCalled();
  });

  it("should add skill to the authenticated user", async () => {
    const bearer: BearerPayload = await createTestBearerPayload("test@gmail.com", userRepository);

    const data: Profile.AddSkillRequest = new Profile.AddSkillRequest();
    data.company = "Concordia";
    data.title = "wtv";
    data.start_year = 2014;
    data.end_year = 2020;

    controller.addSkill(bearer, data);

    expect(mockProfileService.addSkill).not.toHaveBeenCalled();
    const user: User = {
      id: 1,
    } as User;

    jest.spyOn(bearer, "getUser").mockImplementation(() => Promise.resolve(user));

    controller.addSkill(bearer, data);
    expect(await mockProfileService.addSkill).toHaveBeenCalled();
  });

  it("should edit skill", async () => {
    const bearer: BearerPayload = await createTestBearerPayload("test@gmail.com", userRepository);

    const data: Profile.EditWorkRequest = new Profile.EditWorkRequest();
    data.id = 1;
    data.title = "Concordia";
    data.title = "tutor";

    controller.editWork(bearer, data);
    expect(mockProfileService.editWork).not.toHaveBeenCalled();

    const user: User = {
      id: 1,
    } as User;

    jest.spyOn(bearer, "getUser").mockImplementation(() => Promise.resolve(user));

    controller.editWork(bearer, data);
    expect(await mockProfileService.editWork).toHaveBeenCalled();
  });

  it("should delete skill", async () => {
    const bearer: BearerPayload = await createTestBearerPayload("test@gmail.com", userRepository);
    const skillId = 1;

    controller.deleteSkill(bearer, skillId);
    expect(mockProfileService.removeLanguage).not.toHaveBeenCalled();

    const user: User = {
      id: 1,
    } as User;

    jest.spyOn(bearer, "getUser").mockImplementation(() => Promise.resolve(user));

    controller.deleteSkill(bearer, skillId);
    expect(await mockProfileService.removeSkill).toHaveBeenCalled();
  });

  it("should add language to the authenticated user", async () => {
    const bearer: BearerPayload = await createTestBearerPayload("test@gmail.com", userRepository);

    const data: Profile.AddLanguageRequest = new Profile.AddLanguageRequest();
    data.languageName = "english";

    controller.addLanguage(bearer, data);

    expect(mockProfileService.addLanguage).not.toHaveBeenCalled();

    const user: User = {
      id: 1,
    } as User;

    jest.spyOn(bearer, "getUser").mockImplementation(() => Promise.resolve(user));

    controller.addLanguage(bearer, data);
    expect(await mockProfileService.addLanguage).toHaveBeenCalled();
  });

  it("should edit language", async () => {
    const bearer: BearerPayload = await createTestBearerPayload("test@gmail.com", userRepository);

    const data: Profile.EditLanguageRequest = new Profile.EditLanguageRequest();
    data.id = 1;

    controller.editLanguage(bearer, data);
    expect(mockProfileService.editLanguage).not.toHaveBeenCalled();

    const user: User = {
      id: 1,
    } as User;

    jest.spyOn(bearer, "getUser").mockImplementation(() => Promise.resolve(user));

    controller.editLanguage(bearer, data);
    expect(await mockProfileService.editLanguage).toHaveBeenCalled();
  });

  it("should delete language", async () => {
    const bearer: BearerPayload = await createTestBearerPayload("test@gmail.com", userRepository);
    const languageId = 1;

    controller.deleteLanguage(bearer, languageId);
    expect(mockProfileService.removeLanguage).not.toHaveBeenCalled();

    const user: User = {
      id: 1,
    } as User;

    jest.spyOn(bearer, "getUser").mockImplementation(() => Promise.resolve(user));

    controller.deleteLanguage(bearer, languageId);
    expect(await mockProfileService.removeLanguage).toHaveBeenCalled();
  });

  it("should add award to the authenticated user", async () => {
    const bearer: BearerPayload = await createTestBearerPayload("test@gmail.com", userRepository);

    const data: Profile.AddAwardRequest = new Profile.AddAwardRequest();
    data.description = "best student";

    controller.addAward(bearer, data);

    expect(mockProfileService.addAward).not.toHaveBeenCalled();

    const user: User = {
      id: 1,
    } as User;

    jest.spyOn(bearer, "getUser").mockImplementation(() => Promise.resolve(user));

    controller.addAward(bearer, data);
    expect(await mockProfileService.addAward).toHaveBeenCalled();
  });

  it("should edit award", async () => {
    const bearer: BearerPayload = await createTestBearerPayload("test@gmail.com", userRepository);

    const data: Profile.EditAwardRequest = new Profile.EditAwardRequest();
    data.description = "best student";

    controller.editAward(bearer, data);
    expect(mockProfileService.editAward).not.toHaveBeenCalled();

    const user: User = {
      id: 1,
    } as User;

    jest.spyOn(bearer, "getUser").mockImplementation(() => Promise.resolve(user));

    controller.editAward(bearer, data);
    expect(await mockProfileService.editAward).toHaveBeenCalled();
  });

  it("should delete award", async () => {
    const bearer: BearerPayload = await createTestBearerPayload("test@gmail.com", userRepository);
    const languageId = 1;

    controller.deleteAward(bearer, languageId);
    expect(mockProfileService.removeAward).not.toHaveBeenCalled();

    const user: User = {
      id: 1,
    } as User;

    jest.spyOn(bearer, "getUser").mockImplementation(() => Promise.resolve(user));

    controller.deleteAward(bearer, languageId);
    expect(await mockProfileService.removeAward).toHaveBeenCalled();
  });
});
