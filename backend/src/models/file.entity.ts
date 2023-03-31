import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
export class UploadedFileDB {
  @PrimaryGeneratedColumn()
    id: number

  @Column()
    originalName: string

  @Column()
    storedName: string

  @Column()
    url: string

  @Column()
    mime: string

  @Column()
    userId: number

  @Column()
    size: number

  @CreateDateColumn()
    createdAt: Date
}
