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
    addEducation: jest.fn((user, body) => {
      if (user.id != 1) throw new Error();
    }),
    editEducation: jest.fn((user, body) => {
      if (user.id != 1) throw new Error();
    }),
    removeEducation: jest.fn((user, Body) => {
      if (user.id != 1) throw new Error();
    }),
    addCourse: jest.fn((user, Body) => {
      if (user.id != 1) throw new Error();
    }),
    editCourse: jest.fn((user, Body) => {
      if (user.id != 1) throw new Error();
    }),
    removeCourse: jest.fn((user, Body) => {
      if (user.id != 1) throw new Error();
    }),
    addProject: jest.fn((user, Body) => {
      if (user.id != 1) throw new Error();
    }),
    editProject: jest.fn((user, Body) => {
      if (user.id != 1) throw new Error();
    }),
    removeProject: jest.fn((user, Body) => {
      if (user.id != 1) throw new Error();
    }),
    addVolunteering: jest.fn((user, Body) => {
      if (user.id != 1) throw new Error();
    }),
    editvolunteering: jest.fn((user, Body) => {
      if (user.id != 1) throw new Error();
    }),
    removeVolunteering: jest.fn((user, Body) => {
      if (user.id != 1) throw new Error();
    }),
    addWork: jest.fn((user, Body) => {
      if (user.id != 1) throw new Error();
    }),
    editWork: jest.fn((user, Body) => {
      if (user.id != 1) throw new Error();
    }),
    removeWork: jest.fn((user, Body) => {
      if (user.id != 1) throw new Error();
    }),
    addSkill: jest.fn((user, Body) => {
      if (user.id != 1) throw new Error();
    }),
    editSkill: jest.fn((user, Body) => {
      if (user.id != 1) throw new Error();
    }),
    removeSkill: jest.fn((user, Body) => {
      if (user.id != 1) throw new Error();
    }),
    addLanguage: jest.fn((user, Body) => {
      if (user.id != 1) throw new Error();
    }),
    editLanguage: jest.fn((user, Body) => {
      if (user.id != 1) throw new Error();
    }),
    removeLanguage: jest.fn((user, Body) => {
      if (user.id != 1) throw new Error();
    }),
    addAward: jest.fn((user, Body) => {
      if (user.id != 1) throw new Error();
    }),
    editAward: jest.fn((user, Body) => {
      if (user.id != 1) throw new Error();
    }),
    removeAward: jest.fn((user, Body) => {
      if (user.id != 1) throw new Error();
    }),
  };

  const mockUsersRepository = {
    findOne: jest.fn(() => { }),
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

    const user2: User = {
      id: 2,
    } as User;

    jest.spyOn(bearer, "getUser").mockImplementation(() => Promise.resolve(user2));

    try {
      expect(await controller.addEducation(bearer, data)).toThrowError;
    } catch (e) { }
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

    const user2: User = {
      id: 2,
    } as User;

    jest.spyOn(bearer, "getUser").mockImplementation(() => Promise.resolve(user2));

    try {
      expect(await controller.editEducation(bearer, data)).toThrowError;
    } catch (e) { }
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

    const user2: User = {
      id: 2,
    } as User;

    jest.spyOn(bearer, "getUser").mockImplementation(() => Promise.resolve(user2));

    try {
      expect(await controller.deleteEducation(bearer, eduId)).toThrowError;
    } catch (e) { }
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

    const user2: User = {
      id: 2,
    } as User;

    jest.spyOn(bearer, "getUser").mockImplementation(() => Promise.resolve(user2));

    try {
      expect(await controller.addCourse(bearer, data)).toThrowError;
    } catch (e) { }
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

    const user2: User = {
      id: 2,
    } as User;

    jest.spyOn(bearer, "getUser").mockImplementation(() => Promise.resolve(user2));

    try {
      expect(await controller.editCourse(bearer, data)).toThrowError;
    } catch (e) { }
  });

  it("should delete course", async () => {
    const bearer: BearerPayload = await createTestBearerPayload("test@gmail.com", userRepository);
    const courseId = 1;

    controller.deleteCourse(bearer, courseId);
    expect(mockProfileService.removeCourse).not.toHaveBeenCalled();

    const user: User = {
      id: 1,
    } as User;

    jest.spyOn(bearer, "getUser").mockImplementation(() => Promise.resolve(user));

    controller.deleteCourse(bearer, courseId);
    expect(await mockProfileService.removeCourse).toHaveBeenCalled();

    const user2: User = {
      id: 2,
    } as User;

    jest.spyOn(bearer, "getUser").mockImplementation(() => Promise.resolve(user2));

    try {
      expect(await controller.deleteCourse(bearer, courseId)).toThrowError;
    } catch (e) { }
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

    const user2: User = {
      id: 2,
    } as User;

    jest.spyOn(bearer, "getUser").mockImplementation(() => Promise.resolve(user2));

    try {
      expect(await controller.addProject(bearer, data)).toThrowError;
    } catch (e) { }
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

    const user2: User = {
      id: 2,
    } as User;

    jest.spyOn(bearer, "getUser").mockImplementation(() => Promise.resolve(user2));

    try {
      expect(await controller.editProject(bearer, data)).toThrowError;
    } catch (e) { }
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

    const user2: User = {
      id: 2,
    } as User;

    jest.spyOn(bearer, "getUser").mockImplementation(() => Promise.resolve(user2));

    try {
      expect(await controller.deleteProject(bearer, projectId)).toThrowError;
    } catch (e) { }
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

    const user2: User = {
      id: 2,
    } as User;

    jest.spyOn(bearer, "getUser").mockImplementation(() => Promise.resolve(user2));

    try {
      expect(await controller.addVolunteering(bearer, data)).toThrowError;
    } catch (e) { }
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

    const user2: User = {
      id: 2,
    } as User;

    jest.spyOn(bearer, "getUser").mockImplementation(() => Promise.resolve(user2));

    try {
      expect(await controller.editVolunteering(bearer, data)).toThrowError;
    } catch (e) { }
  });

  it("should delete volunteering", async () => {
    const bearer: BearerPayload = await createTestBearerPayload("test@gmail.com", userRepository);
    const volunteeringId = 1;

    controller.deleteVolunteering(bearer, volunteeringId);
    expect(mockProfileService.removeVolunteering).not.toHaveBeenCalled();

    const user: User = {
      id: 1,
    } as User;

    jest.spyOn(bearer, "getUser").mockImplementation(() => Promise.resolve(user));

    controller.deleteVolunteering(bearer, volunteeringId);
    expect(await mockProfileService.removeVolunteering).toHaveBeenCalled();

    const user2: User = {
      id: 2,
    } as User;

    jest.spyOn(bearer, "getUser").mockImplementation(() => Promise.resolve(user2));

    try {
      expect(await controller.deleteVolunteering(bearer, volunteeringId)).toThrowError;
    } catch (e) { }
  });

  it("should add work to the authenticated user", async () => {
    const bearer: BearerPayload = await createTestBearerPayload("test@gmail.com", userRepository);

    const data: Profile.AddWorkRequest = new Profile.AddWorkRequest();
    data.company = "Concordia";
    data.title = "wtv";
    data.start_year = 2014;
    data.end_year = 2020;

    controller.addWork(bearer, data);

    expect(mockProfileService.addWork).not.toHaveBeenCalled();

    const user: User = {
      id: 1,
    } as User;

    jest.spyOn(bearer, "getUser").mockImplementation(() => Promise.resolve(user));

    controller.addWork(bearer, data);
    expect(await mockProfileService.addWork).toHaveBeenCalled();

    const user2: User = {
      id: 2,
    } as User;

    jest.spyOn(bearer, "getUser").mockImplementation(() => Promise.resolve(user2));

    try {
      expect(await controller.addWork(bearer, data)).toThrowError;
    } catch (e) { }
  });

  it("should edit work", async () => {
    const bearer: BearerPayload = await createTestBearerPayload("test@gmail.com", userRepository);

    const data: Profile.EditWorkRequest = new Profile.EditWorkRequest;
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

    const user2: User = {
      id: 2,
    } as User;

    jest.spyOn(bearer, "getUser").mockImplementation(() => Promise.resolve(user2));

    try {
      expect(await controller.editWork(bearer, data)).toThrowError;
    } catch (e) { }
  });

  it("should delete work", async () => {
    const bearer: BearerPayload = await createTestBearerPayload("test@gmail.com", userRepository);
    const workId = 1;

    controller.deleteWork(bearer, workId);
    expect(mockProfileService.removeWork).not.toHaveBeenCalled();

    const user: User = {
      id: 1,
    } as User;

    jest.spyOn(bearer, "getUser").mockImplementation(() => Promise.resolve(user));

    controller.deleteWork(bearer, workId);
    expect(await mockProfileService.removeWork).toHaveBeenCalled();

    const user2: User = {
      id: 2,
    } as User;

    jest.spyOn(bearer, "getUser").mockImplementation(() => Promise.resolve(user2));

    try {
      expect(await controller.deleteWork(bearer, workId)).toThrowError;
    } catch (e) { }
  });

  it("should add skill to the authenticated user", async () => {
    const bearer: BearerPayload = await createTestBearerPayload("test@gmail.com", userRepository);

    const data: Profile.AddSkillRequest = new Profile.AddSkillRequest();
    data.title = "wtv";

    controller.addSkill(bearer, data);

    expect(mockProfileService.addSkill).not.toHaveBeenCalled();
    const user: User = {
      id: 1,
    } as User;

    jest.spyOn(bearer, "getUser").mockImplementation(() => Promise.resolve(user));

    controller.addSkill(bearer, data);
    expect(await mockProfileService.addSkill).toHaveBeenCalled();

    const user2: User = {
      id: 2,
    } as User;

    jest.spyOn(bearer, "getUser").mockImplementation(() => Promise.resolve(user2));

    try {
      expect(await controller.addSkill(bearer, data)).toThrowError;
    } catch (e) { }
  });

  it("should delete skill", async () => {
    const bearer: BearerPayload = await createTestBearerPayload("test@gmail.com", userRepository);
    const skillId = '1';

    controller.deleteSkill(bearer, skillId);
    expect(mockProfileService.removeLanguage).not.toHaveBeenCalled();

    const user: User = {
      id: 1,
    } as User;

    jest.spyOn(bearer, "getUser").mockImplementation(() => Promise.resolve(user));

    controller.deleteSkill(bearer, skillId);
    expect(await mockProfileService.removeSkill).toHaveBeenCalled();

    const user2: User = {
      id: 2,
    } as User;

    jest.spyOn(bearer, "getUser").mockImplementation(() => Promise.resolve(user2));

    try {
      expect(await controller.deleteSkill(bearer, skillId)).toThrowError;
    } catch (e) { }
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

    const user2: User = {
      id: 2,
    } as User;

    jest.spyOn(bearer, "getUser").mockImplementation(() => Promise.resolve(user2));

    try {
      expect(await controller.addLanguage(bearer, data)).toThrowError;
    } catch (e) { }
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

    const user2: User = {
      id: 2,
    } as User;

    jest.spyOn(bearer, "getUser").mockImplementation(() => Promise.resolve(user2));

    try {
      expect(await controller.editLanguage(bearer, data)).toThrowError;
    } catch (e) { }
  });

  it("should delete language", async () => {
    const bearer: BearerPayload = await createTestBearerPayload("test@gmail.com", userRepository);
    const languageId = '1';

    controller.deleteLanguage(bearer, languageId);
    expect(mockProfileService.removeLanguage).not.toHaveBeenCalled();

    const user: User = {
      id: 1,
    } as User;

    jest.spyOn(bearer, "getUser").mockImplementation(() => Promise.resolve(user));

    controller.deleteLanguage(bearer, languageId);
    expect(await mockProfileService.removeLanguage).toHaveBeenCalled();

    const user2: User = {
      id: 2,
    } as User;

    jest.spyOn(bearer, "getUser").mockImplementation(() => Promise.resolve(user2));

    try {
      expect(await controller.deleteLanguage(bearer, languageId)).toThrowError;
    } catch (e) { }
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

    const user2: User = {
      id: 2,
    } as User;

    jest.spyOn(bearer, "getUser").mockImplementation(() => Promise.resolve(user2));

    try {
      expect(await controller.addAward(bearer, data)).toThrowError;
    } catch (e) { }
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

    const user2: User = {
      id: 2,
    } as User;

    jest.spyOn(bearer, "getUser").mockImplementation(() => Promise.resolve(user2));

    try {
      expect(await controller.editAward(bearer, data)).toThrowError;
    } catch (e) { }
  });

  it("should delete award", async () => {
    const bearer: BearerPayload = await createTestBearerPayload("test@gmail.com", userRepository);
    const awardId = 1;

    controller.deleteAward(bearer, awardId);
    expect(mockProfileService.removeAward).not.toHaveBeenCalled();

    const user: User = {
      id: 1,
    } as User;

    jest.spyOn(bearer, "getUser").mockImplementation(() => Promise.resolve(user));

    controller.deleteAward(bearer, awardId);
    expect(await mockProfileService.removeAward).toHaveBeenCalled();

    const user2: User = {
      id: 2,
    } as User;

    jest.spyOn(bearer, "getUser").mockImplementation(() => Promise.resolve(user2));

    try {
      expect(await controller.deleteAward(bearer, awardId)).toThrowError;
    } catch (e) { }
  });
});
