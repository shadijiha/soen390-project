import { ApiProperty } from '@nestjs/swagger'

export namespace Posts {
  export class CreatePostDto {
    @ApiProperty({ required: true })
      content: string

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
      image: Express.Multer.File
  }
}
