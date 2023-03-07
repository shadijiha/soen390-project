import { ApiProperty } from '@nestjs/swagger'

export namespace Chat {

  export class MessageRequest {
    @ApiProperty()
      senderId: number

    @ApiProperty()
      receiverId: number

    @ApiProperty()
      message: string
  }
}
