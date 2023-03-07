import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Skill } from "./skill.entity";
import { User } from "./user.entity";
import { Recruiter } from "./user_types/recruiter.entity";

@Entity()
export class Job extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  jobTitle: string;

  @Column()
  @ApiProperty()
  companyName: string;

  @Column()
  @ApiProperty()
  location: string;

  @Column()
  @ApiProperty()
  jobDescription: string;

  @Column()
  @ApiProperty()
  salary: string;

  @Column()
  @ApiProperty()
  jobType: "full-time" | "part-time" | "contract" | "other";

  @Column()
  @ApiProperty()
  startDate: Date;

  @Column()
  @ApiProperty()
  coverLetter: boolean;

  @Column()
  @ApiProperty()
  transcript: boolean;

  @CreateDateColumn()
  @ApiProperty()
  created_at: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updated_at: Date;

  // RELATIONS

  // recruiter
  @ManyToOne(() => User, (r) => r.jobs)
  // @ApiProperty({ type: User })
  @ApiProperty({ type: () => User })
  user: User;

  // skills
  @ManyToMany(() => Skill, (skill) => skill.job, {
    cascade: true,
    orphanedRowAction: "delete",
  })
  @JoinTable()
  @ApiProperty({ type: [Skill] })
  skills: Skill[];
}
