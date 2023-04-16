/**
 * Types for Request and Respose
 */

import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsAlphanumeric, IsNotEmpty, Length, MinLength } from 'class-validator'

import { App } from '../app.types'
import { User } from '../models/user.entity'

export namespace Auth {
  export class LoginRequest {
    @ApiProperty()
    @IsEmail()
      email: string

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(8)
    @IsAlphanumeric()
      password: string
  }

  export class LoginResponse extends App.WithStatus {
    @ApiProperty({ type: User })
      user: User | Partial<User> | null

    @ApiProperty()
      access_token: string
  }

  export class RegisterRequest extends LoginRequest {
    @Length(2, 50)
    @ApiProperty()
      firstName: string

    @Length(2, 50)
    @ApiProperty()
      lastName: string

    @ApiProperty({ examples: ['male', 'female'] })
      gender: 'male' | 'female'
  }

  export interface GoogleToken {
    'iss': string
    'nbf': number
    'aud': string
    'sub': string
    'email': string
    'email_verified': boolean
    'azp': string
    'name': string
    'picture': string
    'given_name': string
    'family_name': string
    'iat': number
    'exp': number
    'jti': string
  }
}
