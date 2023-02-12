import {
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  HttpException,
  HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
  Request,
} from "@nestjs/common";
import { Body, Put, Query, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common/decorators";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { User } from "../models/user.entity";
import { UsersService } from "./users.service";
import { Users } from "./users.types";
import { AuthUser, BearerPayload, error } from "../util/util";
import { FileFieldsInterceptor, FileInterceptor } from "@nestjs/platform-express";
import { use } from "passport";
import { FileValidationPipe } from "src/util/fileValidationPipe";

@Controller()
@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor (private readonly usersService: UsersService) {}

  @Get("user")
  @ApiResponse({ type: Users.GetAllUsersResponse })
  async findAll (): Promise<User[]> {
    return await this.usersService.findAll()
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

  @UseInterceptors(FileFieldsInterceptor([
    { name: 'profile_pic', maxCount: 1 },
    { name: 'cover_pic', maxCount: 1}
  ]))

  async update(@AuthUser() authedUser: BearerPayload, @Body() user: Users.UpdateUserRequest, @UploadedFiles(FileValidationPipe) files: {profile_pic?: Express.Multer.File, cover_pic?: Express.Multer.File}) {

    console.log(files)
    return this.usersService.update(authedUser.id, user, files)
    
  }



}

