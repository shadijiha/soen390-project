import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";

@Entity("notifications")
export class Notifications extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  type: string;

  @Column()
  @ApiProperty()
  text: string;

  // @Column({ default: null})
  // @ApiProperty()
  // photo: string | null;

  // @Column({ default: null})
  // @ApiProperty()
  // link: string | null;

  // @Column({ default: null})
  // @ApiProperty()
  // title: string | null;

  @Column()
  @ApiProperty()
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
