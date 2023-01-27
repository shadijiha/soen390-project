import {
	BaseEntity,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity("messages")
export class Message extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ length: 1028 }) // Message cannot be greater than 1028 characters
	message: string;

	@Column()
	senderId: number;

	@Column()
	receiverId: number;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@DeleteDateColumn()
	deleted_at: Date;

	public get sender() {
		return User.findOne({ where: { id: this.senderId } });
	}

	public get receiver() {
		return User.findOne({ where: { id: this.receiverId } });
	}
}
