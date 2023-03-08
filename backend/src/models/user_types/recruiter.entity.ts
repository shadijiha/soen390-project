
import { ChildEntity } from 'typeorm'

import { User } from '../user.entity'

@ChildEntity()
export class Recruiter extends User {
//   @OneToMany(() => Job, (j) => j.recruiter, { cascade: true, orphanedRowAction: 'delete' })
//   @ApiProperty({ type: [Job] })
//     jobs: Job[]
}
