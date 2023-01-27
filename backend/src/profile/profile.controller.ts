import {
	Body,
	Controller,
	Delete,
	HttpException,
	Param,
	Put,
	UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { userInfo } from "os";
import { App } from "src/app.types";
import { Auth } from "src/auth/auth.types";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Education } from "src/models/education.entity";
import { AuthUser, BearerPayload } from "src/util/util";
import { ProfileService } from "./profile.service";
import { Profile } from "./profile.types";

@Controller("profile")
@ApiTags("Profile")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ProfileController {
	constructor(private readonly profileService: ProfileService) {}

	@Put("add/education")
	public async addEducation(
		@AuthUser() userInfo: BearerPayload,
		@Body() body: Profile.ProfileAddEducationRequest
	) {
		try {
			const user = await userInfo.getUser(["educations"]);
			this.profileService.createAddEducation(user, body);
		} catch (e) {
			throw new HttpException((<Error>e).message, 400);
		}
	}

	@Delete("delete/education/:id")
	public async deleteEducation(
		@AuthUser() userInfo: BearerPayload,
		@Param("id") id: number
	) {
		try {
			const user = await userInfo.getUser(["educations"]);
			user.educations = user.educations.filter((e) => e.id !== id);
			await user.save();

			// For security reasons, we should only delete the education if it belongs to the user
			const education = await Education.findOne({
				where: { id, user: { id: user.id } },
			});
			await Education.remove(education);
		} catch (e) {
			throw new HttpException((<Error>e).message, 400);
		}
	}
}
