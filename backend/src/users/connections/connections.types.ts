import { ApiProperty } from "@nestjs/swagger";
import { App } from "src/app.types";
import { User } from "src/models/user.entity";

export namespace Connections {
  export class AddConnectionRequest {
    @ApiProperty()
    toUser: number;
  }

  export class AcceptConnectionRequest {
    @ApiProperty()
    id: number;
  }
}
