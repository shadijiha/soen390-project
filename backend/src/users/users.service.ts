import { Injectable } from "@nestjs/common";
import { Auth } from "../auth/auth.types";
import { User } from "../models/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, DeleteResult, Like, Repository } from "typeorm";
import { Users } from "./users.types";
import * as argon2 from "argon2";
import fs from 'fs';  

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
    return await userNoPass;
  }

  async update(id: number, user: Users.UpdateUserRequest, files: {profile_pic?: Express.Multer.File, cover_pic?: Express.Multer.File}): Promise<User> {
    let oldUser = await this.usersRepository.findOneBy({ id });

    oldUser.firstName = user.firstName != '' ? user.firstName : oldUser.firstName;
    oldUser.lastName = user.lastName != '' ? user.lastName : oldUser.lastName;
    oldUser.email = user.email != '' ? user.email : oldUser.email;
    oldUser.password = oldUser.password;
    oldUser.mobileNo = user.mobileNo != '' ? user.mobileNo : oldUser.mobileNo;
    oldUser.gender = user.gender != '' ? user.gender : oldUser.gender;
    oldUser.biography = user.biography != '' ? user.biography : oldUser.biography;

   
    //convert image to base64
    if(files?.profile_pic != null){
      let buff = files.profile_pic[0].buffer;
      let base64data = buff.toString('base64');
      oldUser.profile_pic = base64data;
  }

      //convert image to base64
      if(files?.cover_pic != null){
        let buff = files.cover_pic[0].buffer;
        let base64data = buff.toString('base64');
        oldUser.cover_pic = base64data;
    }

    oldUser.created_at = oldUser.created_at;


    await this.usersRepository.update(id, oldUser);
    return await this.usersRepository.findOneBy({ id });
  }

  async removeSoft(id: number) {
    const user = await this.findOneById(id);
    await this.usersRepository.softRemove(user);
  }

  public async search(user: User, query: string) {
    return {
      users: await this.usersRepository.find({
        where: [
          { firstName: Like(`%${query}%`) },
          { lastName: Like(`%${query}%`) },
          { email: Like(`%${query}%`) },
        ],
        take: 10,
      }),
      companies: [],
    };
  }
}
