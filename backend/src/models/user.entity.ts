import { ApiProperty } from '@nestjs/swagger'
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
  TableInheritance,
  UpdateDateColumn
} from 'typeorm'
import { Award } from './award.entity'
import { Connection } from './connection.entity'
import { Course } from './course.entity'
import { Education } from './education.entity'
import { Language } from './language.entity'
import { Message } from './message.entity'
import { Project } from './project.entity'
import { Recommendation } from './recommendation.entity'
import { Skill } from './skill.entity'
import { Volunteering } from './volunteering.entity'
import { Work } from './work.entity'

@Entity('users')
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
    id: number

  @Column()
  @Index({ fulltext: true })
  @ApiProperty()
    firstName: string

  @Column({ default: null })
  @Index({ fulltext: true })
  @ApiProperty()
    lastName: string

  @Column()
  @Index({ unique: true, fulltext: true })
  @ApiProperty()
    email: string

  @Column({ select: false })
    password: string

  @Column({ default: null })
  @ApiProperty()
    mobileNo: string

  @Column()
  @ApiProperty()
    gender: 'male' | 'female'

  @Column({ default: null, type: 'longtext' })
  @ApiProperty()
    profilePic: string

  @Column({ default: null, type: 'longtext' })
  @ApiProperty()
    coverPic: string

  @Column({ default: null })
  @ApiProperty()
    biography: string

  @CreateDateColumn()
  @ApiProperty()
    created_at: Date

  @UpdateDateColumn()
  @ApiProperty()
    updated_at: Date

  @DeleteDateColumn()
    deleted_at: Date

  // SPECIAL GETTERS AND METHODS
  public get fullName (): string {
    return this.firstName + ' ' + this.lastName
  }

  /**
   * @param otherUser
   * @returns Returns the conversation between the current user and the other user
   */
  public async getMessagesFrom (otherUser: User | number): Promise<Message[]> {
    const otherId = typeof otherUser === 'number' ? otherUser : otherUser.id
    return await Message.find({
      where: [
        { senderId: this.id, receiverId: otherId },
        { senderId: otherId, receiverId: this.id }
      ],
      order: { created_at: 'ASC' }
    })
  }

  // RELATIONS
  // education
  @OneToMany(() => Education, (e) => e.user, {
    cascade: true,
    orphanedRowAction: 'delete'
  })
  @ApiProperty({ type: [Education] })
    educations: Education[]

  // work experience
  @OneToMany(() => Work, (w) => w.user, {
    cascade: true,
    orphanedRowAction: 'delete'
  })
  @ApiProperty({ type: [Work] })
    workExperiences: Work[]

  // volunteering experience
  @OneToMany(() => Volunteering, (v) => v.user, {
    cascade: true,
    orphanedRowAction: 'delete'
  })
  @ApiProperty({ type: [Volunteering] })
    volunteeringExperience: Volunteering[]

  @OneToMany(() => Connection, (connection) => connection.user_1)
    connection_1: Connection[]

  @OneToMany(() => Connection, (connection) => connection.user_2)
    connection_2: Connection[]

  // skills
  @ManyToMany((type) => Skill, (skill) => skill.user, {
    cascade: true,
    orphanedRowAction: 'delete'
  })
  @JoinTable()
  @ApiProperty({ type: [Skill] })
    skills: Skill[]

  // recommendations received
  @OneToMany(() => Recommendation, (recommendation) => recommendation.userRecommended)
  @ApiProperty({ type: [Recommendation] })
    recommendationsReceived: Recommendation[]

  // recommendations given
  @OneToMany(() => Recommendation, (recommendation) => recommendation.userRecommending)
  @ApiProperty({ type: [Recommendation] })
    recommendationsGiven: Recommendation[]

  // courses
  @OneToMany(() => Course, (course) => course.user, {
    cascade: true,
    orphanedRowAction: 'delete'
  })
  @ApiProperty({ type: [Course] })
    courses: Course[]

  // projects
  @OneToMany(() => Project, (project) => project.user, {
    cascade: true,
    orphanedRowAction: 'delete'
  })
  @ApiProperty({ type: [Project] })
    projects: Project[]

  // awards
  @OneToMany(() => Award, (award) => award.user, {
    cascade: true,
    orphanedRowAction: 'delete'
  })
  @ApiProperty({ type: [Award] })
    awards: Award[]

  // languages
  @ManyToMany((type) => Language, (language) => language.user, {
    cascade: true,
    orphanedRowAction: 'delete'
  })
  @JoinTable()
  @ApiProperty({ type: [Language] })
    languages: Language[]
}
