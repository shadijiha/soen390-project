import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";




@Entity()
export class Connection extends BaseEntity{
    
    @PrimaryGeneratedColumn()
	@ApiProperty()
	id: number;

    @Column()
    @ApiProperty()
    accepted: boolean

    
    @ManyToOne(() => User, (user) => user.connections)
    @ApiProperty({ type: () => User })
    user1: User

    @ManyToOne(() => User, (user) => user.connections)
    @ApiProperty({ type: () => User })
    user2: User



}