import { ConflictException, UnauthorizedException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { User } from "../models/user.entity";
import { setupTestDB } from "../util/testUtil";
import { AuthController } from "./auth.controller";

describe("AuthController", () => {
	let controller: AuthController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [...setupTestDB()],
			controllers: [AuthController],
		}).compile();

		controller = module.get<AuthController>(AuthController);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});

	// Test the register
	const emailToTest = "test" + Math.floor(Math.random() * 10e9) + "@test.com";
	it("Register with new email", async () => {
		const registerResult = await controller.register({
			email: emailToTest,
			firstName: "First name sample",
			lastName: "Last name sample",
			gender: "female",
			password: "hehexd",
		});

		expect(registerResult).toHaveProperty("user.email", emailToTest);
	});

	// Test the register with the same email
	it("Register with existing email", async () => {
		expect(
			await controller.register({
				email: emailToTest,
				firstName: "First name sample",
				lastName: "Last name sample",
				gender: "female",
				password: "hehexd",
			})
		).toThrow(ConflictException);
	});

	// Test logging in with wong password
	it("Login with wrong password", async () => {
		expect(
			await controller.login({
				email: emailToTest,
				password: "wrong_password",
			})
		).toThrow(UnauthorizedException);
	});

	// Test logging in with non existing email
	it("Login with non existing email", async () => {
		const notExistingEmail =
			"test" + Math.floor(Math.random() * 10e12) + "@test.com";
		expect(
			await controller.login({
				email: notExistingEmail,
				password: "hehexd",
			})
		).toThrow(UnauthorizedException);
	});

	// Login with correct email, password
	it("Login with correct email and password", async () => {
		expect(
			await controller.login({
				email: emailToTest,
				password: "hehexd",
			})
		).toHaveProperty("user.email", emailToTest);
	});

	// Check /me
	it("Me when payload is ok", async () => {
		expect(
			await controller.me({
				email: emailToTest,
				id: (await User.findOne({ where: { email: emailToTest } })).id,
			})
		).toHaveProperty("user.email", emailToTest);
	});

	it("Me when payload is null", async () => {
		expect(await controller.me(null)).toThrowError();
	});

	afterAll(async () => {
		(await User.findOne({ where: { email: emailToTest } }))?.remove();
	});
});
