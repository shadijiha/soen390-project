import { ApiProperty } from "@nestjs/swagger";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationCount,
  UpdateDateColumn,
} from "typeorm";
import { Education } from "./education.entity";
import { Skill } from "./skill.entity";
import { Volunteering } from "./volunteering.entity";
import { Work } from "./work.entity";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @Index()
  @ApiProperty()
  firstName: string;

  @Column({default: null})
  @Index()
  @ApiProperty()
  lastName: string;

  @Column()
  @Index({ unique: true })
  @ApiProperty()
  email: string;

  @Column({ select: false })
  password: string;

  @Column({default: null})
  @ApiProperty()
  mobileNo: string;

  @Column()
  @ApiProperty()
  gender: "male" | "female";

  @Column({default: null})
  @ApiProperty()
  biography: string;

  @CreateDateColumn()
  @ApiProperty()
  created_at: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updated_at: Date;

  // RELATIONS

  //education
  @OneToMany(() => Education, (e) => e.user)
  @ApiProperty({ type: [Education] })
  educations: Education[];

  //work experience
  @OneToMany(() => Work, (w) => w.user)
  @ApiProperty({ type: [Work] })
  workExperience: Work[];

  //volunteering experience
  @OneToMany(() => Volunteering, (v) => v.user)
  @ApiProperty({ type: [Volunteering] })
  volunteeringExperience: Volunteering[];

  //connections
  @ManyToMany(() => User, (user) => user.connections)
  @ApiProperty({ type: [User] })
  connections: User[];



  //skills
  @ManyToMany((type) => Skill, (skill) => skill.user)
  @JoinTable()
  @ApiProperty({ type: [Skill] }) 
  skills: Skill[];

  // SPECIAL GETTERS
  public get fullName() {
    return this.firstName + " " + this.lastName;
  }
}
