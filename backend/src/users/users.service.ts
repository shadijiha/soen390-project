import { Injectable } from "@nestjs/common";
import { Auth } from "src/auth/auth.types";
import { User } from "src/models/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class UsersService {

	constructor(
		@InjectRepository(User)
		private usersRepository: Repository<User>,
		private dataSource: DataSource
	  ) {}

	  
	// public async create(body: Auth.RegisterRequest) {
	// 	const user = new User();
	// 	user.email = body.email;
	// 	user.password = body.password;
	// 	user.firstName = body.fistName;
	// 	user.lastName = body.lastName;
	// 	user.gender = body.gender;
	// 	await user.save();
	// 	return user;
	// }

	public async getByEmail(email: string) {
		return await User.findOne({ where: { email } });
	}

	findAll(): Promise<User[]>{
		return this.usersRepository.find();
	}

	findOneById(id: number): Promise<User>{
		return this.usersRepository.findOneBy({id});
	}

	findOneByEmail(email: string): Promise<User>{
		return this.usersRepository.findOneBy({email});
	}


	create(body: Auth.RegisterRequest): Promise<User>{
		const user = new User();
		user.email = body.email;
		user.password = body.password;
		user.firstName = body.fistName;
		user.lastName = body.lastName;
		user.gender = body.gender;

		return this.usersRepository.save(user);
		}


	update(id: number, user: User){
		return this.usersRepository.update(id, user);
	}

	async remove(id: string): Promise<void>{
		await this.usersRepository.delete(id);
	}



}
