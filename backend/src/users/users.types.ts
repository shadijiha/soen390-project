/**
 * Types for Request and Respose
 */

import { ApiProperty } from '@nestjs/swagger'
import { App } from '../app.types'
import { User } from '../models/user.entity'

export namespace Users {
  export class GetAllUsersResponse extends App.WithStatus {
    @ApiProperty({ isArray: true, type: User })
      user: User[] | null
  }

  export class GetUserByIdResponse extends App.WithStatus {
    @ApiProperty({ type: User })
      user: User | null

    @ApiProperty({ enum: ['Connected', 'Pending', 'NotConnected'] })
      connectionStatus: 'Connected' | 'Pending' | 'NotConnected'

    @ApiProperty({ type: User, isArray: true })
      connections: User[]
  }

  export class GetUserResponse extends App.WithStatus {
    @ApiProperty({ type: User })
      user: User | null
  }

  export class UpdateUserRequest {
    @ApiProperty({ required: false })
      firstName: string

    @ApiProperty({ required: false })
      lastName: string

    @ApiProperty({ required: false })
      email: string

    @ApiProperty({ required: false })
      mobileNo: string

    @ApiProperty({ examples: ['male', 'female'], required: false })
      gender: 'male' | 'female' | ''

    @ApiProperty({ required: false })
      biography: string

    @ApiProperty({
      type: 'file',
      properties: {
        file: {
          type: 'string',
          format: 'binary'
        }
      },
      required: false
    }
    )
      profilePic: Express.Multer.File

    @ApiProperty({
      type: 'file',
      properties: {
        file: {
          type: 'string',
          format: 'binary'
        }
      },
      required: false
    }
    )
      coverPic: Express.Multer.File
  }

  export class UpdateUserResponse extends App.WithStatus {
    @ApiProperty({ type: User })
      user: User | null
  }

  export class SearchResponse {
    @ApiProperty({ type: [User] })
      users: User[]

    @ApiProperty({ type: [] })
      companies: any[] // TODO: Add Company type
  }
}
