import { ApiProperty } from '@nestjs/swagger'

export namespace Chat {

  export class MessageRequest {
    @ApiProperty()
      receiverId: number

    @ApiProperty()
      message: string
  }
}
