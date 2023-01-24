import { Controller, Delete, Get, Request } from "@nestjs/common";
import { Body, Put, UseGuards } from "@nestjs/common/decorators";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { User } from "../models/user.entity";
import { DeleteResult } from "typeorm";
import { UsersService } from "./users.service";
import { Users } from "./users.types";

@Controller("users")
@ApiTags("Users")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiResponse({ type: Users.GetAllUsersResponse })
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  // @UseGuards(JwtAuthGuard)
  // @Get("me")
  // @ApiResponse({ type: Users.GetUserResponse })
  // async findOneById(@Request() req): Promise<User> {
  //   return this.usersService.findOneById(req.user.id);
  // }

  @Put()
  @ApiResponse({ type: Users.UpdateUserResponse })
  update(@Request() req, @Body() user: Users.UpdateUserRequest): Promise<User> {
    return this.usersService.update(req.user.id, user);
  }

  @Delete()
  remove(@Request() req): Promise<DeleteResult> {
    return this.usersService.remove(req.user.id);
  }
}
