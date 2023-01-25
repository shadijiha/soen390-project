/**
 * Types for Request and Respose
 */

import { ApiProperty } from "@nestjs/swagger";
import { App } from "../app.types";
import { User } from "../models/user.entity";

export namespace Auth {
  export class LoginRequest {
    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;
  }

  export class LoginResponse extends App.WithStatus {
    @ApiProperty({ type: User })
    user: User | Partial<User> | null;

    @ApiProperty()
    access_token: string;
  }

  export class RegisterRequest extends LoginRequest {
    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty({ examples: ["male", "female"] })
    gender: "male" | "female";
  }
}
