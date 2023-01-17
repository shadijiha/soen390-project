import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/models/user.entity";

@Injectable()
export class AuthService {
	constructor(private jwtService: JwtService) {}

	public async validateUser(
		email: string,
		pass: string
	): Promise<Partial<User> | null> {
		const user = await User.createQueryBuilder()
			.select("user.password")
			.addSelect("user")
			.where("email = :email", {
				email,
			})
			.getOne();

		// TODO: implement Argon encryption
		if (user && user.password === pass) {
			const { password, ...result } = user;
			return result;
		}
		return null;
	}

	public async login(user: User) {
		const payload = { email: user.email, id: user.id };
		return this.jwtService.sign(payload);
	}
}
