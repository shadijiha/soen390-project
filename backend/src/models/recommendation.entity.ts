import { ApiProperty } from "@nestjs/swagger";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Recommendation extends BaseEntity {
	@PrimaryGeneratedColumn()
	@ApiProperty()
	id: number;

	//   @Column()
	//   @ApiProperty()
	//   recommendingUser: User;

	@Column()
	@ApiProperty()
	relationship: string;

	@Column()
	@ApiProperty()
	message: string;

	// RELATIONS
	@ManyToOne(() => User, (u) => u.recommendationsReceived)
	@ApiProperty({ type: () => User })
	userRecommended: User;

	@ManyToOne(() => User, (u) => u.recommendationsGiven)
	@ApiProperty({ type: () => User })
	userRecommending: User;

	@CreateDateColumn()
	@ApiProperty()
	created_at: Date;

	@UpdateDateColumn()
	@ApiProperty()
	updated_at: Date;
}
