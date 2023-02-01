import { ApiProperty } from "@nestjs/swagger";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationCount,
  UpdateDateColumn,
} from "typeorm";
import { Award } from "./award.entity";
import { Course } from "./course.entity";
import { Education } from "./education.entity";
import { Language } from "./language.entity";
import { Message } from "./message.entity";
import { Project } from "./project.entity";
import { Recommendation } from "./recommendation.entity";
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

  @Column({ default: null })
  @Index()
  @ApiProperty()
  lastName: string;

  @Column()
  @Index({ unique: true })
  @ApiProperty()
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ default: false })
  @ApiProperty()
  is_admin: boolean;

  @Column({ default: null })
  @ApiProperty()
  mobileNo: string;

  @Column()
  @ApiProperty()
  gender: "male" | "female";

  @Column({ default: null })
  @ApiProperty()
  profile_pic: string;

  @Column({ default: null })
  @ApiProperty()
  biography: string;

  @CreateDateColumn()
  @ApiProperty()
  created_at: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  // SPECIAL GETTERS AND METHODS
  public get fullName() {
    return this.firstName + " " + this.lastName;
  }

  /**
   * @param otherUser
   * @returns Returns the conversation between the current user and the other user
   */
  public async getMessagesFrom(otherUser: User | number) {
    const otherId = typeof otherUser === "number" ? otherUser : otherUser.id;
    const messages = await Message.find({
      where: [
        { senderId: this.id, receiverId: otherId },
        { senderId: otherId, receiverId: this.id },
      ],
      order: { created_at: "ASC" },
    });
  }

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

  //recommendations received
  @OneToMany(() => User, (user) => user.recommendationsReceived)
  @ApiProperty({ type: [Recommendation] })
  recommendationsReceived: Recommendation[];

  //recommendations given
  @OneToMany(() => User, (user) => user.recommendationsGiven)
  @ApiProperty({ type: [Recommendation] })
  recommendationsGiven: Recommendation[];

  //courses
  @OneToMany(() => Course, (course) => course.user)
  @ApiProperty({ type: [Course] })
  courses: Course[];

  //projects
  @OneToMany(() => Project, (project) => project.user)
  @ApiProperty({ type: [Project] })
  projects: Project[];

  //awards
  @OneToMany(() => Award, (award) => award.user)
  @ApiProperty({ type: [Award] })
  awards: Award[];

  //languages
  @ManyToMany((type) => Language, (language) => language.user)
  @JoinTable()
  @ApiProperty({ type: [Language] })
  languages: Language[];
}
