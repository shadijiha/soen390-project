import {
	Body,
	Controller,
	Get,
	Post,
	UseGuards,
	Request,
} from "@nestjs/common";
import { ConflictException, HttpException } from "@nestjs/common/exceptions";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "src/models/user.entity";
import { UsersService } from "src/users/users.service";
import { AuthUser, BearerPayload } from "src/util/util";
import { AuthService } from "./auth.service";
import { Auth } from "./auth.types";
import { JwtAuthGuard } from "./jwt-auth.guard";

@Controller("auth")
@ApiTags("Authentication")
export class AuthController {
	constructor(
		private readonly userService: UsersService,
		private readonly authService: AuthService
	) {}

	@Post("login")
	@ApiResponse({ type: Auth.LoginResponse })
	public async login(
		@Body() body: Auth.LoginRequest
	): Promise<Auth.LoginResponse> {
		//try {
		return await this.authService.login(body);
		// } catch (e) {
		// 	return error<Auth.LoginResponse>(e);
		// }
	}

	@Post("register")
	@ApiResponse({ type: Auth.LoginResponse })
	public async register(
		@Body() body: Auth.RegisterRequest
	): Promise<Auth.LoginResponse> {
		// Check if the user exists first
		if (await User.findOne({ where: { email: body.email } })) {
			throw new ConflictException("Email " + body.email + " already taken");
		}

		await this.userService.create(body);
		return await this.authService.login(body);
	}

	@Get("me")
	@ApiResponse({ type: User })
	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	public async me(@AuthUser() authedUser: BearerPayload): Promise<User> {
		return this.userService.getByEmail(authedUser.email);
	}
}
