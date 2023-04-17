import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { type Request } from 'express'
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor () {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWTFromCookie
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.APP_SECRET
    })
  }

  private static extractJWTFromCookie (req: Request): string | null {
    if (req.cookies?.accessToken !== null) {
      return req.cookies.accessToken
    }
    return null
  }

  async validate (payload: any): Promise<{ email: string, id: number }> {
    return { email: payload.email, id: payload.id }
  }
}
