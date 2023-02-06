import {
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Request,
} from "@nestjs/common";
import { Body, Put, Query, UseGuards } from "@nestjs/common/decorators";
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { User } from "../models/user.entity";
import { UsersService } from "./users.service";
import { Users } from "./users.types";
import { AuthUser, BearerPayload, error } from "../util/util";

@Controller()
@ApiTags("Users")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("users")
  @ApiResponse({ type: Users.GetAllUsersResponse })
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Delete("users")
  remove(@AuthUser() authedUser: BearerPayload) {
    try {
      this.usersService.removeSoft(authedUser.id);
    } catch (e) {
      throw new HttpException(
        "Failed to delete user \n" + (<Error>e).message,
        HttpStatus.PRECONDITION_FAILED
      );
    }
  }

  @Get("search")
  @ApiQuery({ name: "query", required: true })
  public async search(
    @AuthUser() authedUser: BearerPayload,
    @Query("query") query: string
  ) {
    if (query.length <= 0) return { users: [], companies: [] };
    return this.usersService.search(await authedUser.getUser(), query);
  }
}
