import { ApiProperty } from '@nestjs/swagger'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Message } from './message.entity'
import { Post } from './post.entity'
import { User } from './user.entity'

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
    status: 'unresolved' | 'safe' | 'banned' | 'warned'

  @Column()
  @ApiProperty()
    reportedFullName: string

  @Column({ default: null, type: 'longtext' })
  @ApiProperty()
    reportedProfilePic: string | null

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
  @OneToOne(() => Post, {cascade: true, onDelete: 'CASCADE'})
  @JoinColumn()
  @ApiProperty({ type: Post })
    post: Post

  // user who reported
  @ManyToOne(() => User, (user) => user.reports)
  @ApiProperty({ type: () => User })
    reporter: User

  // user who was reported
  @ManyToOne(() => User, (user) => user.gotReported)
  @ApiProperty({ type: () => User })
    reported: User
}
