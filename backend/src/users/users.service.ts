import { Injectable } from "@nestjs/common";
import { Auth } from "src/auth/auth.types";
import { User } from "src/models/user.entity";

@Injectable()
export class UsersService {
	public async create(body: Auth.RegisterRequest) {
		const user = new User();
		user.email = body.email;
		user.password = body.password;
		user.firstName = body.fistName;
		user.lastName = body.lastName;
		user.gender = body.gender;
		await user.save();
		return user;
	}

	public async getByEmail(email: string) {
		return await User.findOne({ where: { email } });
	}
}
