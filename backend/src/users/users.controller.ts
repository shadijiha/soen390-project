import {
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Request,
} from "@nestjs/common";
import { Body, Put, Query, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common/decorators";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { User } from "../models/user.entity";
import { UsersService } from "./users.service";
import { Users } from "./users.types";
import { AuthUser, BearerPayload, error } from "../util/util";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller()
@ApiTags("Users")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("user")
  @ApiResponse({ type: Users.GetAllUsersResponse })
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Delete("user")
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


  @Put("user")
  @ApiConsumes("multipart/form-data")
  @ApiResponse({ type: Users.UpdateUserResponse })
  @UseInterceptors(FileInterceptor('file'))
  async update(@AuthUser() authedUser: BearerPayload, @Body() user: Users.UpdateUserRequest, @UploadedFile() file: Express.Multer.File) {
    console.log(file);
    console.log(user);
    return this.usersService.update(authedUser.id, user);
  }


}
