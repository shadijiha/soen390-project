import { ApiProperty } from '@nestjs/swagger'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { User } from './user.entity'

@Entity()
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
    id: number

  @Column()
  @ApiProperty()
    name: string

  @Column()
  @ApiProperty()
    description: string

  @Column()
  @ApiProperty()
    url: string

  @Column()
  @ApiProperty()
    start_year: number

  @Column()
  @ApiProperty()
    end_year: number

  @CreateDateColumn()
  @ApiProperty()
    created_at: Date

  @UpdateDateColumn()
  @ApiProperty()
    updated_at: Date

  // RELATIONS
  @ManyToOne(() => User, (u) => u.workExperiences)
  @ApiProperty({ type: () => User })
    user: User
}
