import { ApiProperty } from "@nestjs/swagger";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	Index,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { Education } from "./education.entity";

@Entity()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	@ApiProperty()
	id: number;

	@Column()
	@Index({ unique: true })
	@ApiProperty()
	email: string;

	@Column({ select: false })
	password: string;

	@Column()
	@Index()
	@ApiProperty()
	firstName: string;

	@Column()
	@Index()
	@ApiProperty()
	lastName: string;

	@Column()
	@ApiProperty()
	gender: "male" | "female";

	@CreateDateColumn()
	@ApiProperty()
	created_at: Date;

	@UpdateDateColumn()
	@ApiProperty()
	updated_at: Date;

	// RELATIONS
	@OneToMany(() => Education, (e) => e.user)
	@ApiProperty({ type: [Education] })
	educations: Education[];

	// SPECIAL GETTERS
	public get fullName() {
		return this.firstName + " " + this.lastName;
	}
}
