import { Injectable } from "@nestjs/common";
import { BaseRequest } from "src/util/util";
import { BaseEntity } from "typeorm";
import { Course } from "../models/course.entity";
import { Project } from "../models/project.entity";
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

	public async addCourse(
		user: User,
		data: Profile.ProfileAddCourseRequest
	) {
		const course = new Course
		this.createModel(data, course)
		user.courses = [...user.courses, course]
		await user.save()
	}

	public async removeCourse(
		user: User,
		id: number
	) {
		user.courses = user.courses.filter((c) => c.id !== id)
		await user.save()
	}

	public async addProject(
		user: User,
		data: Profile.ProfileAddProjectRequest
	) {
		const project = new Project
		this.createModel(data, project)
		user.projects = [...user.projects, project]
		await user.save()
	}

	public async removeProject(
		user: User,
		id: number
	) {
		user.projects = user.projects.filter((p) => p.id !== id)
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
