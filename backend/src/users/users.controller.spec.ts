import { Test, type TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { dataSourceMockFactory } from "../util/mockDataSource";
import { DataSource } from "typeorm";
import { User } from "../models/user.entity";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { AuthUser, type BearerPayload } from "../util/util";
import { type Users } from "./users.types";

describe("UsersController", () => {
	let controller: UsersController;
	let service: UsersService;
	beforeEach(async () => {
		const ApiServiceProvider = {
			provide: UsersService,
			useFactory: () => ({
				findAll: jest.fn(() => []),
				update: jest.fn(() => {}),
				getByEmail: jest.fn(() => {}),
				remove: jest.fn(() => {})
			})
		};
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UsersService,
				{
					provide: getRepositoryToken(User),
					useValue: {}
				},
				{ provide: DataSource, useFactory: dataSourceMockFactory },
				ApiServiceProvider
			],
			controllers: [UsersController]
		}).compile();
		controller = module.get<UsersController>(UsersController);
		service = module.get<UsersService>(UsersService);
	});
	it("should be defined", () => {
		expect(controller).toBeDefined();
	});

	it("should return all users", async () => {
		const allUsers = await controller.findAll();
		expect(service.findAll).toHaveBeenCalled;
	});

	it("should return logged in user", async () => {
		const bearer: BearerPayload = { email: "test@gmail.com", id: 1 };
		const loggedInUser = await controller.me(bearer);
		expect(service.getByEmail).toHaveBeenCalled;
	});

	it("should return updated user", async () => {
		const bearer: BearerPayload = { email: "test@gmail.com", id: 1 };
		const body: Users.UpdateUserRequest = {
			firstName: "Test",
			lastName: null,
			email: null,
			gender: null,
			mobileNo: null,
			biography: null,
			educations: [],
			workExperience: [],
			volunteeringExperience: [],
			connections: [],
			skills: [],
			recommendationsGiven: [],
			recommendationsReceived: [],
			courses: [],
			projects: [],
			awards: [],
			languages: []
		};
		const updatedUser = await controller.update(bearer, body);
		expect(service.update).toHaveBeenCalled;
	});

	it("should delete logged in user", async () => {
		const bearer: BearerPayload = { email: "test@gmail.com", id: 1 };
		const deletedUser = await controller.remove(bearer);
		expect(service.removeSoft).toHaveBeenCalled;
	});
});
