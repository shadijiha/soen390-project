import {
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Request,
} from "@nestjs/common";
import {
  Body,
  HttpCode,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common/decorators";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { response } from "express";
import { Auth } from "src/auth/auth.types";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { User } from "src/models/user.entity";
import { Code, DeleteResult } from "typeorm";
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

  @UseGuards(JwtAuthGuard)
  @Get("me")
  @ApiResponse({ type: Users.GetUserResponse })
  async findOneById(@Request() req): Promise<User> {
    return this.usersService.findOneById(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  @ApiResponse({ type: Users.UpdateUserResponse })
  update(@Request() req, @Body() user: Users.UpdateUserRequest): Promise<User> {
    return this.usersService.update(req.user.id, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Request() req): Promise<DeleteResult> {
    return this.usersService.remove(req.user.id);
  }
}
