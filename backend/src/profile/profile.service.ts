import { Injectable } from "@nestjs/common";
import { Education } from "src/models/education.entity";
import { User } from "src/models/user.entity";
import { Profile } from "./profile.types";

@Injectable()
export class ProfileService {
	public async createAddEducation(
		user: User,
		data: Profile.ProfileAddEducationRequest
	) {
		const education = new Education();
		education.institution = data.institution;
		education.degree = data.degree;
		education.start_year = data.start_year;
		education.end_year = data.end_year;
		education.user = user;
		await education.save();

		user.educations = [...user.educations, education];
		await user.save();
	}
}
