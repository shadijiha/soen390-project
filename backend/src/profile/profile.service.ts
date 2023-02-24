import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Award } from "../models/award.entity";
import { Course } from "../models/course.entity";
import { Education } from "../models/education.entity";
import { Language } from "../models/language.entity";
import { Project } from "../models/project.entity";
import { Skill } from "../models/skill.entity";
import { type User } from "../models/user.entity";
import { Volunteering } from "../models/volunteering.entity";
import { Work } from "../models/work.entity";
import { type Profile } from "./profile.types";

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Education) private readonly educationRepository: Repository<Education>,
    @InjectRepository(Course) private readonly courseRepository: Repository<Course>,
    @InjectRepository(Project) private readonly projectRepository: Repository<Project>,
    @InjectRepository(Volunteering) private readonly volunteeringRepository: Repository<Volunteering>,
    @InjectRepository(Award) private readonly awardRepository: Repository<Award>,
    @InjectRepository(Language) private readonly languageRepository: Repository<Language>,
    @InjectRepository(Skill) private readonly skillRepository: Repository<Skill>,
    @InjectRepository(Work) private readonly workRepository: Repository<Work>
  ) {}

  public async addEducation(user: User, data: Profile.AddEducationRequest): Promise<void> {
    const education = new Education();
    education.institution = data.institution;
    education.start_year = data.start_year;
    education.end_year = data.end_year;
    education.degree = data.degree;

    user.educations = [...user.educations, education];
    await user.save();
  }

  public async removeEducation(user: User, id: number): Promise<void> {
    await this.educationRepository
      .findOneOrFail({
        where: {
          id: id,
          user: { id: user.id },
        },
      })
      .then(async (e: Education) => await this.educationRepository.delete({ id: e.id }));
  }

  public async editEducation(user: User, request: Profile.EditEducationRequest): Promise<void> {
    const found = user.educations.find((e) => e.id === request.id);
    if (found == null) {
      throw new NotFoundException();
    }
    const education: Education = found;
    await this.educationRepository.update(education.id, request);
  }

  public async addCourse(user: User, data: Profile.AddCourseRequest): Promise<void> {
    const course = new Course();
    course.courseName = data.courseName;
    course.courseNumber = data.courseNumber;

    user.courses = [...user.courses, course];
    await user.save();
  }

  public async removeCourse(user: User, id: number): Promise<void> {
    await this.courseRepository
      .findOneOrFail({
        where: {
          id: id,
          user: { id: user.id },
        },
      })
      .then(async (c: Course) => await this.courseRepository.delete({ id: c.id }));
  }

  public async editCourse(user: User, request: Profile.EditCourseRequest): Promise<void> {
    const found = user.courses.find((c) => c.id === request.id);
    if (found == null) {
      throw new NotFoundException();
    }
    const course: Course = found;
    await this.courseRepository.update(course.id, request);
  }

  public async addProject(user: User, data: Profile.AddProjectRequest): Promise<void> {
    const project = new Project();
    project.description = data.description;
    project.start_year = data.start_year;
    project.end_year = data.end_year;
    project.url = data.url;
    project.name = data.name;

    user.projects = [...user.projects, project];
    await user.save();
  }

  public async removeProject(user: User, id: number): Promise<void> {
    await this.projectRepository
      .findOneOrFail({
        where: {
          id: id,
          user: { id: user.id },
        },
      })
      .then(async (p: Project) => await this.projectRepository.delete({ id: p.id }));
  }

  public async editProject(user: User, request: Profile.EditProjectRequest): Promise<void> {
    const found = user.projects.find((p) => p.id === request.id);
    if (found == null) {
      throw new NotFoundException();
    }
    const project: Project = found;
    await this.projectRepository.update(project.id, request);
  }

  public async addVolunteering(user: User, data: Profile.AddVolunteeringRequest): Promise<void> {
    const volunteering = new Volunteering();
    volunteering.company = data.company;
    volunteering.title = data.title;
    volunteering.start_year = data.start_year;
    volunteering.end_year = data.end_year;

    user.volunteeringExperience = [...user.volunteeringExperience, volunteering];
    await user.save();
  }

  public async removeVolunteering(user: User, id: number): Promise<void> {
    await this.volunteeringRepository
      .findOneOrFail({
        where: {
          id: id,
          user: { id: user.id },
        },
      })
      .then(async (v: Volunteering) => await this.volunteeringRepository.delete({ id: v.id }));
  }

  public async editvolunteering(user: User, request: Profile.EditVolunteeringRequest): Promise<void> {
    const found = user.volunteeringExperience.find((v) => v.id === request.id);
    if (found == null) {
      throw new NotFoundException();
    }
    const volunteering: Volunteering = found;
    await this.volunteeringRepository.update(volunteering.id, request);
  }

  public async addAward(user: User, data: Profile.AddAwardRequest): Promise<void> {
    const award = new Award();
    award.description = data.description;
    award.issue_date = data.issue_date;
    award.issuer = data.issuer;
    award.title = data.title;
    award.url = data.url;

    user.awards = [...user.awards, award];
    await user.save();
  }

  public async removeAward(user: User, id: number): Promise<void> {
    await this.awardRepository
      .findOneOrFail({
        where: [{ id }, { user: { id: user.id } }],
      })
      .then(async (a: Award) => await this.awardRepository.delete({ id: a.id }));
  }

  public async editAward(user: User, request: Profile.EditAwardRequest): Promise<void> {
    const found = user.awards.find((v) => v.id === request.id);
    if (found == null) {
      throw new NotFoundException();
    }
    const award: Award = found;
    await this.awardRepository.update(award.id, request);
  }

  public async addLanguage(user: User, data: Profile.AddLanguageRequest): Promise<void> {
    const language = new Language();
    language.languageName = data.languageName;
    language.proficiency = data.proficiency;

    user.languages = [...user.languages, language];
    await user.save();
  }

  public async removeLanguage(user: User, id: number): Promise<void> {
    await this.languageRepository
      .findOneOrFail({
        where: [{ id }, { user: { id: user.id } }],
      })
      .then(async (l: Language) => await this.languageRepository.delete({ id: l.id }));
  }

  public async editLanguage(user: User, request: Profile.EditLanguageRequest): Promise<void> {
    const found = user.languages.find((l) => l.id === request.id);
    if (found == null) {
      throw new NotFoundException();
    }
    const language: Language = found;
    await this.languageRepository.update(language.id, request);
  }

  public async addSkill(user: User, data: Profile.AddSkillRequest): Promise<void> {
    const skills: Skill[] = [];
    data.title
      .split(",")
      .filter((s) => s !== "")
      .forEach((s: string, i: number): void => {
        skills[i] = new Skill();
        skills[i].title = s;
      });

    if (skills.length === 0) return;

    user.skills = [...user.skills, ...skills];
    await user.save();
  }

  public async removeSkill(user: User, id: number): Promise<void> {
    await this.skillRepository
      .findOneOrFail({
        where: [{ id }, { user: { id: user.id } }],
      })
      .then(async (s: Skill) => await this.skillRepository.delete({ id: s.id }));
  }

  public async addWork(user: User, data: Profile.AddWorkRequest): Promise<void> {
    const work = new Work();
    work.company = data.company;
    work.title = data.title;
    work.start_year = data.start_year;
    work.end_year = data.end_year;

    user.workExperiences = [...user.workExperiences, work];
    await user.save();
  }

  public async removeWork(user: User, id: number): Promise<void> {
    await this.workRepository
      .findOneOrFail({
        where: {
          id: id,
          user: { id: user.id },
        },
      })
      .then(async (w: Work) => await this.workRepository.delete({ id: w.id }));
  }

  public async editWork(user: User, request: Profile.EditWorkRequest): Promise<void> {
    const found = user.workExperiences.find((w) => w.id === request.id);
    if (found == null) {
      throw new NotFoundException();
    }
    const work: Work = found;
    await this.workRepository.update(work.id, request);
  }
}
