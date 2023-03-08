import { ApiProperty } from '@nestjs/swagger'
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Job } from './job.entity'
import { User } from './user.entity'

@Entity()
export class Skill extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
    id: number

  @Column({ unique: true })
  @ApiProperty()
    title: string

  @CreateDateColumn()
  @ApiProperty()
    created_at: Date

  @UpdateDateColumn()
  @ApiProperty()
    updated_at: Date

  // RELATIONS
  @ManyToMany(() => User, (u) => u.skills)
  @ApiProperty({ type: [User] })
    user: User[]

  @ManyToMany(() => Job, (j) => j.skills)
  @ApiProperty({ type: [Job] })
    job: Job[]
}
