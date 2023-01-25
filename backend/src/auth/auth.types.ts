/**
 * Types for Request and Respose
 */

import { ApiProperty } from "@nestjs/swagger";
import { App } from "src/app.types";
import { User } from "src/models/user.entity";

export namespace Auth {
  export class LoginRequest {
    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;
  }

  export class LoginResponse extends App.WithStatus {
    @ApiProperty({ type: User })
    user: User | null;

    @ApiProperty()
    access_token: string;
  }

  export class RegisterRequest extends LoginRequest {
    @ApiProperty()
    fistName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty({ examples: ["male", "female"] })
    gender: "male" | "female";
  }
}
