import {
	Body,
	Controller,
	Delete,
	HttpException,
	Param,
	Put,
	UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { AuthUser, BearerPayload } from "src/util/util";
import { ProfileService } from "./profile.service";
import { Profile } from "./profile.types";

@Controller("profile")
@ApiTags("Profile")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ProfileController {
	constructor(private readonly profileService: ProfileService) { }

	@Put("add/education")
	public async addEducation(
		@AuthUser() userInfo: BearerPayload,
		@Body() body: Profile.ProfileAddEducationRequest
	) {
		try {
			this.profileService.addEducation(await userInfo.getUser(["educations"]), body);
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
			this.profileService.removeEduction(await userInfo.getUser(["educations"]), id)
		} catch (e) {
			throw new HttpException((<Error>e).message, 400);
		}
	}

	@Put("add/course")
	public async addCourse(
		@AuthUser() userInfo: BearerPayload,
		@Body() body: Profile.ProfileAddCourseRequest
	) {
		try {
			this.profileService.addCourse(await userInfo.getUser(["courses"]), body)
		} catch (e) {
			throw new HttpException((<Error>e).message, 400);
		}
	}

	@Delete("delete/course/:id")
	public async deleteCourse(
		@AuthUser() userInfo: BearerPayload,
		@Param("id") id: number
	) {
		try {
			this.profileService.removeCourse(await userInfo.getUser(["courses"]), id)
		} catch (e) {
			throw new HttpException((<Error>e).message, 400)
		}
	}
		} catch (e) {
			throw new HttpException((<Error>e).message, 400);
		}
	}
}
