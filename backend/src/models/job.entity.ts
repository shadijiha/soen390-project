import { ApiProperty } from '@nestjs/swagger'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Application } from './application.entity'
import { Skill } from './skill.entity'
import { User } from './user.entity'

@Entity()
export class Job extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
    id: number

  // make optional
  @Column({ nullable: true })
  @ApiProperty()
    externalUrl: string

  @Column()
  @ApiProperty()
    jobTitle: string

  @Column()
  @ApiProperty()
    companyName: string

  @Column()
  @ApiProperty()
    location: string

  @Column({ type: 'text' })
  @ApiProperty()
    jobDescription: string

  @Column()
  @ApiProperty()
    salary: string

  @Column()
  @ApiProperty()
    jobType: 'full-time' | 'part-time' | 'contract' | 'other'

  @Column()
  @ApiProperty()
    startDate: Date

  @Column()
  @ApiProperty()
    coverLetter: boolean

  @Column()
  @ApiProperty()
    transcript: boolean

  @CreateDateColumn()
  @ApiProperty()
    created_at: Date

  @UpdateDateColumn()
  @ApiProperty()
    updated_at: Date

  // RELATIONS

  // recruiter
  @ManyToOne(() => User, (r) => r.jobs)
  @ApiProperty({ type: () => User })
    user: User

  // skills
  @ManyToMany(() => Skill, (skill) => skill.job, {
    cascade: true,
    orphanedRowAction: 'delete'
  })
  @JoinTable()
  @ApiProperty({ type: [Skill] })
    skills: Skill[]

  // applications
  @OneToMany(() => Application, (a) => a.job, {
    cascade: true,
    orphanedRowAction: 'delete'
  })
  @ApiProperty({ type: () => [Application] })
    applications: Application[]
}
