import { ApiProperty } from '@nestjs/swagger'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn
} from 'typeorm'
import { User } from './user.entity'

@Entity()
@Unique(['user_1', 'user_2'])
export class Connection extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
    id: number

  @Column({ default: false })
  @ApiProperty()
    isAccepted: boolean

  // user_id1 is the id of the sender
  @ManyToOne(() => User, (user) => user.connection_1)
  @ApiProperty()
    user_1

  @ManyToOne(() => User, (user) => user.connection_2)
  @ApiProperty()
    user_2

  @CreateDateColumn()
  @ApiProperty()
    created_at: Date

  @UpdateDateColumn()
  @ApiProperty()
    updated_at: Date
}
