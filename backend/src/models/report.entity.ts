import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

@Entity()
export class Report extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	reported_by_id: number;

	@Column()
	type: "post" | "chat";

	@Column()
	entity_id: number;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}
