import { Injectable } from "@nestjs/common";
import { BaseRequest } from "src/util/util";
import { BaseEntity } from "typeorm";
import { Profile } from "./profile.types";

@Injectable()
export class ProfileService {
	public async addEducation(
		user: User,
		data: Profile.ProfileAddEducationRequest
	) {
		const education = new Education
		this.createModel(data, education)
		user.educations = [...user.educations, education];
		await user.save();
	}

	public async removeEduction(
		user: User,
		id: number
	) {
		user.educations = user.educations.filter((e) => e.id !== id)
		await user.save()
	}
	/*
	* Assign only what exist in target, in case we have hydrated request after it arrived
	*/
	private createModel(source: BaseRequest, target: BaseEntity) {
		for (let prop in source) {
			if (target.hasOwnProperty(prop)) {
				target[prop] = source[prop]
			}
		}
	}
}
