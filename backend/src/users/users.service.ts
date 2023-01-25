import { Injectable } from "@nestjs/common";
import { Auth } from "src/auth/auth.types";
import { User } from "src/models/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, DeleteResult, Repository } from "typeorm";
import { Users } from "./users.types";

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

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOneById(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOneBy({ email });
  }

  create(body: Auth.RegisterRequest): Promise<User> {
    const user = new User();
    user.email = body.email;
    user.password = body.password;
    user.firstName = body.fistName;
    user.lastName = body.lastName;
    user.gender = body.gender;

    return this.usersRepository.save(user);
  }

  async update(id: number, user: Users.UpdateUserRequest): Promise<User> {
    let oldUser = await this.usersRepository.findOneBy({ id });
    let updatedUser = new User();

    updatedUser.email = user.email != null ? user.email : oldUser.email;
    updatedUser.firstName =
      user.firstName != null ? user.firstName : oldUser.firstName;
    updatedUser.lastName =
      user.lastName != null ? user.lastName : oldUser.lastName;
    updatedUser.gender = user.gender != null ? user.gender : oldUser.gender;
    updatedUser.password = oldUser.password;
    updatedUser.created_at = oldUser.created_at;

    await this.usersRepository.update(id, updatedUser);
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<DeleteResult> {
    return this.usersRepository.delete(id);
  }
}
