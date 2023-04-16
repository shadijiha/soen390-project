import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { User } from '../models/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Strategy, VerifyCallback } from 'passport-google-oauth20'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_AUTH_CALLBACK,
            scope: ['email', 'profile']
        })
    }

    async validate(
        _accessToken: string,
        _refreshToken: string,
        profile: any,
        done: VerifyCallback
    ): Promise<any> {
        const { name, emails, photos, id } = profile

        const user = {
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            picture: photos[0].value,
            sub: id
        }
        done(null, user)
    }

    // async authenticate(token: string) {
    //     const tokenInfo = await this.getTokenInfo(token);

    //     const email = tokenInfo.email;

    //     try {
    //         const user = await this.usersService.getByEmail(email);

    //         return this.handleRegisteredUser(user);
    //     } catch (error) {
    //         if (error.status !== 404) {
    //             throw new error;
    //         }

    //         return this.registerUser(token, email);
    //     }
    // }
}
