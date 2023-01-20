import {
	Body,
	Controller,
	Get,
	Post,
	UseGuards,
	Request,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "src/models/user.entity";
import { UsersService } from "src/users/users.service";
import { error } from "src/util/util";
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
		console.log(body)
		try {
			const user = await this.userService.getByEmail(body.email);
			return {
				user: user,
				access_token: await this.authService.login(user),
			};
		} catch (e) {
			return error<Auth.LoginResponse>(e);
		}
	}

	@Post("register")
	@ApiResponse({ type: Auth.LoginResponse })
	public async register(
		@Body() body: Auth.RegisterRequest
	): Promise<Auth.LoginResponse> {
	
		try {
			const user = await this.userService.create(body);
			return {
				user,
				access_token: await this.authService.login(user),
			};
		} catch (e) {
			return error<Auth.LoginResponse>(e);
		}
	}

	@Get("me")
	@ApiResponse({ type: User })
	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	public async me(@Request() req): Promise<User> {
		return this.userService.getByEmail(req.user.email);
	}
}
