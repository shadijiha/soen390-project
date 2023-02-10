import { ApiProperty } from '@nestjs/swagger'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { User } from './user.entity'

@Entity()
export class Skill extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
    id: number

  @Column()
  @ApiProperty()
    company: string

  @Column()
  @ApiProperty()
    title: string

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
  @ManyToMany(() => User, (u) => u.skills)
  @ApiProperty({ type: [User] })
    user: User[]
}
