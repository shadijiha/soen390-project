import { ApiProperty } from '@nestjs/swagger'
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { type Job } from './job.entity'
import { type User } from './user.entity'

@Entity()
export class Skill extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
    id: number

  @Column()
  @ApiProperty()
    title: string

  @CreateDateColumn()
  @ApiProperty()
    created_at: Date

  @UpdateDateColumn()
  @ApiProperty()
    updated_at: Date

  // RELATIONS
  // @ManyToMany(() => User, (u) => u.skills)
  // @ApiProperty({ type: [User] })
  user: User[]

  // @ManyToMany(() => Job, (j) => j.skills)
  // @ApiProperty({ type: [Job] })
  job: Job[]
}
