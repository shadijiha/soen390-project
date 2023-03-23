import { ApiProperty } from '@nestjs/swagger'
import { BaseRequest } from '../util/util'

export namespace Applications {
  export class AddApplicationRequest extends BaseRequest {
    @ApiProperty()
      name: string

    @ApiProperty()
      email: string

    @ApiProperty()
      phone: string

    @ApiProperty({
      type: 'file',
      properties: {
        file: {
          type: 'string',
          format: 'binary'
        }
      },
      required: false
    })
      cv: Express.Multer.File

    @ApiProperty({
      type: 'file',
      properties: {
        file: {
          type: 'string',
          format: 'binary'
        }
      },
      required: false
    })
      coverLetter: Express.Multer.File
  }
}
