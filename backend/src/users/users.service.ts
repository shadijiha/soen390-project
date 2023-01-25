import { Injectable } from "@nestjs/common";
import { Auth } from "../auth/auth.types";
import { User } from "../models/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, DeleteResult, Repository } from "typeorm";
import { Users } from "./users.types";
import * as argon2 from "argon2";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private dataSource: DataSource
  ) {}

  public async getByEmail(email: string) {
    return await this.usersRepository.findOne({ where: { email } });
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

  public async create(body: Auth.RegisterRequest) {
    const user = new User();
    user.email = body.email;
    user.password = await argon2.hash(body.password);
    user.firstName = body.firstName;
    user.lastName = body.lastName;
    user.gender = body.gender;

    const { password, ...userNoPass } = await this.usersRepository.save(user);
    return userNoPass;
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

    this.usersRepository.update(id, updatedUser);
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<DeleteResult> {
    return this.usersRepository.delete(id);
  }
}
