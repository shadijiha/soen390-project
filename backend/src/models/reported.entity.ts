import { ApiProperty } from '@nestjs/swagger'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Message } from './message.entity'
import { Post } from './post.entity'

@Entity('reported')
export class Reported extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
    id: number

  @Column()
  @ApiProperty()
    type: 'post' | 'message'

  @Column()
  @ApiProperty()
    status: 'resolved' | 'unresolved'

  @CreateDateColumn()
  @ApiProperty()
    created_at: Date

  @UpdateDateColumn()
  @ApiProperty()
    updated_at: Date

  @DeleteDateColumn()
    deleted_at: Date

  // RELATIONS
  // messages
  @OneToOne(() => Message)
  @JoinColumn()
  @ApiProperty({ type: Message })
    message: Message

  // posts
  @OneToOne(() => Post)
  @JoinColumn()
  @ApiProperty({ type: Post })
    post: Post
}
