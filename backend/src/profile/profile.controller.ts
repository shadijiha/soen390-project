import {
	Body,
	Controller,
	Delete,
	HttpException,
	Param,
	Post,
	Put,
	UseGuards,
	UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import path =  require("path");
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { AuthUser, BearerPayload } from "src/util/util";
import { ProfileService } from "./profile.service";
import { Profile } from "./profile.types";
import { diskStorage } from "multer";
import { Get, Res, UploadedFile } from "@nestjs/common/decorators";
import { Observable, of } from "rxjs";
import { join } from "path";

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

	@Put("add/project")
	public async addProject(
		@AuthUser() userInfo: BearerPayload,
		@Body() body: Profile.ProfileAddProjectRequest
	) {
		try {
			this.profileService.addProject(await userInfo.getUser(["projects"]), body)
		} catch (e) {
			throw new HttpException((<Error>e).message, 400);
		}
	}

	@Delete("delete/project/:id")
	public async deleteProject(
		@AuthUser() userInfo: BearerPayload,
		@Param("id") id: number
	) {
		try {
			this.profileService.removeProject(await userInfo.getUser(["projects"]), id)
		} catch (e) {
			throw new HttpException((<Error>e).message, 400)
		}
	}

	@Put("add/volunteering")
	public async addVolunteering(
		@AuthUser() userInfo: BearerPayload,
		@Body() body: Profile.ProfileAddVolunteeringRequest
	) {
		try {
			this.profileService.addVolunteering(await userInfo.getUser(["volunteerings"]), body)
		} catch (e) {
			throw new HttpException((<Error>e).message, 400);
		}
	}

	@Delete("delete/volunteering/:id")
	public async deleteVolunteering(
		@AuthUser() userInfo: BearerPayload,
		@Param("id") id: number
	) {
		try {
			this.profileService.removeVolunteering(await userInfo.getUser(["volunteerings"]), id)
		} catch (e) {
			throw new HttpException((<Error>e).message, 400)
		}
	}
 

	//upload profile picture
	@Post("upload/profile-picture")
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		schema: {
		  type: 'object',
		  properties: {
			file: {
			  type: 'string',
			  format: 'binary',
			},
		  },
		},
	  })
	@UseInterceptors(FileInterceptor('file', {
		storage: diskStorage({
			destination: './images',
			filename: (req, file, cb) => {
				
				const fileName: string = path.parse(file.originalname).name.replace(/\s/g, '') + Date.now();
				const extension: string = path.parse(file.originalname).ext;

				cb(null, `${fileName}${extension}`);
			}
		})
	}))
	public async uploadProfilePicture(@AuthUser() authedUser: BearerPayload, @UploadedFile() file: Express.Multer.File) {
		try{
			
			const profile_pic =  await this.profileService.uploadProfilePicture(await authedUser.getUser(), file.filename)
			return {profile_pic: profile_pic}
		}
		 catch (e) {
			throw new HttpException((<Error>e).message, 400)
		}
	}
	


	@Get('profile-picture/:filename')
	findProfilePicture(@Param('filename') filename: string, @Res() res): Observable<any> {
		
		return res.sendFile(join(process.cwd(), 'images/' + filename));
	}




}

