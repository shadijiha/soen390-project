import { ConflictException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test, type TestingModule } from "@nestjs/testing";
import { DataSource, type Repository } from "typeorm";
import { User } from "../models/user.entity";
import { setupTestDB } from "../util/testUtil";
import { AuthController } from "./auth.controller";
import { UsersModule } from "../users/users.module";
import { getRepositoryToken } from "@nestjs/typeorm";
import { UsersService } from "../users/users.service";
import { dataSourceMockFactory } from "../util/mockDataSource";
import { AuthService } from "./auth.service";
import { createTestBearerPayload } from "../util/util";
import { Users } from "src/users/users.types";
import { Auth } from "./auth.types";

describe("AuthController", () => {
	let controller: AuthController;
	let userRepository: Repository<User>;
	const mockUserService = {
		findOneByEmail: jest.fn(() => {throw new ConflictException(`Email already taken`)} ),
		create: jest.fn((dto) => {
			return {
				id: 1,
				...dto
			}
		}),
	
	}
	const mockAuthService = {
		login: jest.fn((dto) => {
			return {
				access_token: 'blabla',
			    id: 1,
				email: dto.email,
				firstName: dto.firstName,
				lastName: dto.lastName,
				gender: dto.gender
			}})
}


	const mockUsersRepository = {
		findOne: jest.fn((emai) => userToTest),
	}

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UsersService,
				AuthService,
				JwtService,
				{
					provide: getRepositoryToken(User),
					useValue: mockUsersRepository,
				},
				{ provide: DataSource, useFactory: dataSourceMockFactory },
			],
			controllers: [AuthController],
		}).overrideProvider(UsersService).useValue(mockUserService)
		.overrideProvider(AuthService).useValue(mockAuthService)
		.compile();

		controller = module.get<AuthController>(AuthController);
		userRepository = module.get(getRepositoryToken(User));
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});

	// Test the register
	const emailToTest = `test${Math.floor(Math.random() * 10e9)}@test.com`;

	const userToTest: Auth.RegisterRequest = {firstName: 'test', lastName: 'test', email: 'test@gmail.com', password: '123', gender: 'male' }
	
	it("should register and return the user", async () => {
		
		expect(await controller.register(userToTest)).toEqual({
			access_token: expect.any(String),
			id: expect.any(Number),
			email: userToTest.email,
			firstName: userToTest.firstName,
			lastName: userToTest.lastName,
			gender: userToTest.gender
		});
		
		
		expect(mockAuthService.login).toBeCalledWith(userToTest)
		expect(mockUserService.findOneByEmail).toBeCalledWith(userToTest.email)
		
	});

	// Test the register with the same email
	// it("should raise an email already exists error", async () => {
	// 	expect(
	// 		await controller.register({
	// 			email: userToTest.email,
	// 			firstName: "First name sample",
	// 			lastName: "Last name sample",
	// 			gender: "female",
	// 			password: "hehexd",
	// 		})
	// 	).toThrow(ConflictException);
	// });


	// Test logging in with wong password
	// it("should throw UnauthorizedException error", async () => {
	// 	expect(
	// 		await controller.login({
	// 			email: emailToTest,
	// 			password: "wrong_password",
	// 		})
	// 	).toThrow(UnauthorizedException);
	// });

	// Test logging in with non existing email
	// it("should throw UnauthorizedException error", async () => {
	// 	const notExistingEmail = `test${Math.floor(
	// 		Math.random() * 10e12
	// 	)}@test.com`;
	// 	expect(
	// 		await controller.login({
	// 			email: notExistingEmail,
	// 			password: "hehexd",
	// 		})
	// 	).toThrow(UnauthorizedException);
	// });

	// Login with correct email, password
	it("should login and return user and access token", async () => {
		expect(
			await controller.login({
				email: emailToTest,
				password: "hehexd",
			})
		).toHaveProperty("email", emailToTest);
	});

	// Check /me
	it("should return a user", async () => {
		expect(
			await controller.me(
				await createTestBearerPayload(userToTest.email, userRepository)
			)
		).toEqual(userToTest);
	});

	// it("should throw an error", async () => {
	// 	expect(
	// 		await controller.me(
	// 			await createTestBearerPayload(emailToTest, userRepository)
	// 		)
	// 	).toThrowError();
	// });

	// afterAll(async () => {
	// 	(
	// 		await userRepository.findOne({
	// 			where: { email: emailToTest },
	// 		})
	// 	)?.remove();
	// });
});
