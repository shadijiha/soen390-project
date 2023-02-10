import { ChildEntity } from 'typeorm'
import { User } from '../user.entity'

@ChildEntity()
export class JobSeeker extends User {}
