import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor () {
    console.log(ExtractJwt.fromAuthHeaderAsBearerToken())
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.APP_SECRET
    })
  }

  async validate (payload: any) {
    return { id: payload.id, email: payload.email }
  }
}
