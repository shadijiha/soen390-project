import { ApiProperty } from '@nestjs/swagger'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Job } from './job.entity'
import { User } from './user.entity'

@Entity()
export class Application extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
    id: number

  @Column()
  @ApiProperty()
    name: string

  @Column()
  @ApiProperty()
    email: string

  @Column()
  @ApiProperty()
    phone: string

  @Column({ default: null, type: 'longtext' })
  @ApiProperty()
    cv: string

  @Column({ default: null, type: 'longtext' })
  @ApiProperty()
    coverLetter: string

  // RELATIONS
  // user
  @ManyToOne(() => User, (u) => u.applications)
    user: User

  // job
  @ManyToOne(() => Job, (j) => j.applications)
  @ApiProperty({ type: () => Job })
    job: Job

  @CreateDateColumn()
  @ApiProperty()
    created_at: Date
}
