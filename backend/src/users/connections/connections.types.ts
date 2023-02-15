import { ApiProperty } from '@nestjs/swagger'

export namespace Connections {
  export class AddConnectionRequest {
    @ApiProperty()
      toUser: number
  }

  export class AcceptConnectionRequest {
    @ApiProperty()
      id: number
  }
}
