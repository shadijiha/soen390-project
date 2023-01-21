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

	updatedUser.firstName = user.firstName != null ? user.firstName : oldUser.firstName;
    updatedUser.lastName = user.lastName != null ? user.lastName : oldUser.lastName;
    updatedUser.email = user.email != null ? user.email : oldUser.email;
    updatedUser.password = oldUser.password;
	updatedUser.mobileNo = user.mobileNo != null ? user.mobileNo : oldUser.mobileNo;
    updatedUser.gender = user.gender != null ? user.gender : oldUser.gender;
	updatedUser.biography = user.biography != null ? user.biography : oldUser.biography;
	updatedUser.educations = user.educations != null ? user.educations : oldUser.educations;
	updatedUser.workExperience = user.workExperience != null ? user.workExperience : oldUser.workExperience;
	updatedUser.volunteeringExperience = user.volunteeringExperience != null ? user.volunteeringExperience : oldUser.volunteeringExperience;
	updatedUser.connections = user.connections != null ? user.connections : oldUser.connections;
	updatedUser.skills = user.skills != null ? user.skills : oldUser.skills;
	updatedUser.recommendationsReceived = user.recommendationsReceived != null ? user.recommendationsReceived : oldUser.recommendationsReceived;
	updatedUser.recommendationsGiven = user.recommendationsGiven != null ? user.recommendationsGiven : oldUser.recommendationsGiven;
	updatedUser.courses = user.courses != null ? user.courses : oldUser.courses;
	updatedUser.projects = user.projects != null ? user.projects : oldUser.projects;
	updatedUser.awards = user.awards != null ? user.awards : oldUser.awards;
	updatedUser.languages = user.languages != null ? user.languages : oldUser.languages;
    updatedUser.created_at = oldUser.created_at;
	




    await this.usersRepository.update(id, updatedUser);
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<DeleteResult> {
    return this.usersRepository.delete(id);
  }
}
