import { Injectable } from "@nestjs/common";
import { type BaseRequest } from "src/util/util";
import { type BaseEntity } from "typeorm";
import { Course } from "../models/course.entity";
import { Education } from "../models/education.entity";
import { Project } from "../models/project.entity";
import { type User } from "../models/user.entity";
import { Volunteering } from "../models/volunteering.entity";
import { type Profile } from "./profile.types";

@Injectable()
export class ProfileService {
	public async addEducation(
		user: User,
		data: Profile.ProfileAddEducationRequest
	): Promise<void> {
		const education = new Education();
		this.createModel(data, education);
		user.educations = [...user.educations, education];
		await user.save();
	}

	public async removeEduction(user: User, id: number): Promise<void> {
		user.educations = user.educations.filter((e) => e.id !== id);
		await user.save();
	}

	public async addCourse(
		user: User,
		data: Profile.ProfileAddCourseRequest
	): Promise<void> {
		const course = new Course();
		this.createModel(data, course);
		user.courses = [...user.courses, course];
		await user.save();
	}

	public async removeCourse(user: User, id: number): Promise<void> {
		user.courses = user.courses.filter((c) => c.id !== id);
		await user.save();
	}

	public async addProject(
		user: User,
		data: Profile.ProfileAddProjectRequest
	): Promise<void> {
		const project = new Project();
		this.createModel(data, project);
		user.projects = [...user.projects, project];
		await user.save();
	}

	public async removeProject(user: User, id: number): Promise<void> {
		user.projects = user.projects.filter((p) => p.id !== id);
		await user.save();
	}

	public async addVolunteering(
		user: User,
		data: Profile.ProfileAddVolunteeringRequest
	): Promise<void> {
		const volunteering = new Volunteering();
		this.createModel(data, volunteering);
		user.volunteeringExperience = [
			...user.volunteeringExperience,
			volunteering
		];
		await user.save();
	}

	public async removeVolunteering(user: User, id: number): Promise<void> {
		user.volunteeringExperience = user.volunteeringExperience.filter(
			(v) => v.id !== id
		);
		await user.save();
	}

	/*
	 * Assign only what exist in target, in case we have hydrated request after it arrived
	 */
	private createModel(source: BaseRequest, target: BaseEntity): void {
		for (const prop in target) {
			target[prop] = source[prop];
		}
	}
}
