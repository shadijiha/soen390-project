import { ApiProperty } from '@nestjs/swagger'
import { ChildEntity, OneToMany } from 'typeorm'
import { Education } from '../education.entity'
import { Job } from '../job.entity'
import { User } from '../user.entity'

@ChildEntity()
export class Recruiter extends User {
  @OneToMany(() => Job, (j) => j.recruiter, { cascade: true, orphanedRowAction: 'delete' })
  @ApiProperty({ type: [Job] })
    jobs: Job[]
}
