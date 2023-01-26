import { Injectable } from "@nestjs/common";
import { UnauthorizedException } from "@nestjs/common/exceptions";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import * as argon2 from "argon2";
import { Repository } from "typeorm";
import { User } from "../models/user.entity";
import { Auth } from "./auth.types";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  public async validateUser(
    email: string,
    pass: string
  ): Promise<Partial<User> | null> {
    const user = await this.usersRepository
      .createQueryBuilder("user")
      .select("user.password")
      .addSelect("user")
      .where("email = :email", {
        email,
      })
      .getOne();

    // TODO: implement Argon encryption
    if (user && (await argon2.verify(user.password, pass))) {
      const { password, ...result } = user; // Remove password from user object (we don't want to return it)
      return result;
    }
    return null;
  }

  public async login({ email, password }: Auth.LoginRequest) {
    // Validate email
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException("Email  " + email + " is invalid");
    }

    // validate password
    if (await this.validateUser(email, password)) {
      const payload = {
        email,
        id: user.id,
      };

      return {
        user,
        access_token: this.jwtService.sign(payload),
      };
    } else {
      throw new UnauthorizedException("Wrong password for " + email);
    }
  }
}
