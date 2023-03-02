import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Job } from "../models/job.entity";
import { Skill } from "../models/skill.entity";
import { Recruiter } from "../models/user_types/recruiter.entity";
import { Repository } from "typeorm";
import { type Jobs } from "./jobs.types";

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Recruiter)
    private readonly recruiterRepository: Repository<Recruiter>,
    @InjectRepository(Job)
    private readonly jobsRepository: Repository<Job>,
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>
  ) {}

  async createJob(data: Jobs.AddJobRequest, recruiter: Recruiter): Promise<void> {
    const job = new Job();
    job.jobTitle = data.jobTitle;
    job.companyName = data.companyName;
    job.location = data.location;
    job.jobDescription = data.jobDescription;
    job.salary = data.salary;
    job.jobType = data.jobType;
    job.startDate = data.startDate;
    job.coverLetter = data.coverLetter;
    job.transcript = data.transcript;

    if (data.skills != null) {
      if (data.skills == "" || data.skills == " ") {
        job.skills = [];
      } else {
        const skills: Skill[] = [];
        data.skills
          .split(",")
          .filter((s) => s !== "")
          .forEach((s: string, i: number): void => {
            skills[i] = new Skill();
            skills[i].title = s.trim();
          });

        const existingSkills = await this.skillRepository.find({
          where: skills.map((s) => ({ title: s.title })),
        });

        const newSkills = skills.filter((s) => existingSkills.find((es) => es.title === s.title) == null);

        job.skills = [...existingSkills, ...newSkills];
      }
    }

    recruiter.jobs = [...recruiter.jobs, job];

    await this.recruiterRepository.save(recruiter);
  }

  async updateJob(jobId: number, data: Jobs.UpdateJobRequest, recruiter: Recruiter): Promise<void> {
    const found = recruiter.jobs.find((job) => job.id === jobId);

    if (found == null) {
      throw new NotFoundException();
    }

    const job: Job = found;

    if (data.skills != null) {
      if (data.skills == "" || data.skills == " ") {
        job.skills = [];
      } else {
        const skills: Skill[] = [];
        data.skills
          .split(",")
          .filter((s) => s !== "")
          .forEach((s: string, i: number): void => {
            skills[i] = new Skill();
            skills[i].title = s.trim();
          });

        const existingSkills = await this.skillRepository.find({
          where: skills.map((s) => ({ title: s.title })),
        });

        const newSkills = skills.filter((s) => existingSkills.find((es) => es.title === s.title) == null);

        job.skills = [...existingSkills, ...newSkills];
      }

      await this.jobsRepository.save(job);
    }
    const { skills, ...dataNoSkills } = data;

    await this.jobsRepository.update(jobId, dataNoSkills);
  }

  async deleteJob(jobId: number, recruiter: Recruiter): Promise<void> {
    const found = recruiter.jobs.find((job) => job.id === jobId);

    if (found == null) {
      throw new NotFoundException();
    }

    await this.jobsRepository.delete(found.id);
  }
}
