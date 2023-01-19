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
export class Course extends BaseEntity {
	@PrimaryGeneratedColumn()
	@ApiProperty()
	id: number;

	@Column()
	@ApiProperty()
	courseName: string;

	@Column()
	@ApiProperty()
	courseNumber: string;


	@CreateDateColumn()
	@ApiProperty()
	created_at: Date;

	@UpdateDateColumn()
	@ApiProperty()
	updated_at: Date;


	// RELATIONS
	@ManyToOne(() => User, (u) => u.courses)
	@ApiProperty({ type: () => User })
	user: User;
}
