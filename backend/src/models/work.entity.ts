import { ApiProperty } from "@nestjs/swagger";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Work extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  company: string;

  @Column()
  @ApiProperty()
  title: string;

  @Column()
  @ApiProperty()
  start_year: number;

  @Column()
  @ApiProperty()
  end_year: number;

  @CreateDateColumn()
  @ApiProperty()
  created_at: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updated_at: Date;

  // RELATIONS
  @ManyToOne(() => User, (u) => u.workExperience)
  @ApiProperty({ type: () => User })
  user: User;
}
