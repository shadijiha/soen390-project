import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator"

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
