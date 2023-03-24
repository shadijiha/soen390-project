import { ApiProperty } from "@nestjs/swagger";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity("post")
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null,length: 1028 }) // Post cannot be greater than 1028 characters
  content: string;

  @Column({ default: null, type: 'longtext' })
  image?: string | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @ManyToOne(() => User, (u) => u.workExperiences)
  @ApiProperty({ type: () => User })
  user: User;
}
