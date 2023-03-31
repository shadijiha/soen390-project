import { ApiProperty } from '@nestjs/swagger'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { User } from './user.entity'

@Entity('messages')
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
    id: number

  @Column({ length: 1028 }) // Message cannot be greater than 1028 characters
  @ApiProperty()
    message: string

  @Column()
  @ApiProperty()
    senderId: number

  @Column()
  @ApiProperty()
    receiverId: number

  @CreateDateColumn()
  @ApiProperty()
    created_at: Date

  @UpdateDateColumn()
    updated_at: Date

  @DeleteDateColumn()
    deleted_at: Date

  public get sender (): Promise<User | null> {
    return User.findOne({ where: { id: this.senderId } })
  }

  public get receiver (): Promise<User | null> {
    return User.findOne({ where: { id: this.receiverId } })
  }
}
