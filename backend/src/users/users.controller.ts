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
  @Get(":id")
  @ApiResponse({ type: Users.GetUserResponse })
  async findOneById(
    @Request() req,
    @Param("id", ParseIntPipe) id: number
  ): Promise<User> {
    if (id == req.user.id) {
      return this.usersService.findOneById(req.user.id);
    } else {
      throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put(":id")
  @ApiResponse({ type: Users.UpdateUserResponse })
  update(
    @Request() req,
    @Param("id") id: number,
    @Body() user: Users.UpdateUserRequest
  ): Promise<User> {
    if (id == req.user.id) {
      return this.usersService.update(id, user);
    } else {
      throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Request() req, @Param("id") id: string): Promise<DeleteResult> {
    if (id == req.user.id) {
      return this.usersService.remove(id);
    } else {
      throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
    }
  }
}
