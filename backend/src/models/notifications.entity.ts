import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";

@Entity("notifications")
export class Notifications extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  text: string;

  @Column()
  photo: string;

  @Column()
  link: string;

  @Column()
  title: string;

  @Column()
  read: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @ManyToOne(() => User, (u) => u.notifications, { onDelete: "CASCADE" })
  @ApiProperty({ type: () => User })
  user: User;


}
