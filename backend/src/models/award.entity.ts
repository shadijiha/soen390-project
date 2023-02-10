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
export class Award extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
    id: number

  @Column()
  @ApiProperty()
    title: string

  @Column()
  @ApiProperty()
    issuer: string

  @Column()
  @ApiProperty()
    url: string

  @Column()
  @ApiProperty()
    issue_date: Date

  @Column()
  @ApiProperty()
    description: string

  @CreateDateColumn()
  @ApiProperty()
    created_at: Date

  @UpdateDateColumn()
  @ApiProperty()
    updated_at: Date

  // RELATIONS
  @ManyToOne(() => User, (u) => u.workExperience)
  @ApiProperty({ type: () => User })
    user: User
}
