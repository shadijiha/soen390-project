import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  HttpException,
  Res,
  UseInterceptors,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { Observable } from "rxjs";
import { AuthUser, BearerPayload } from "src/util/util";
import { FileService } from "./files.service";
import path = require("path");
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { join } from "path";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@ApiTags("files")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("files")
export class FileController {
  constructor(private readonly fileService: FileService) {}

  //upload profile picture
  @Post("upload/profile-picture")
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: {
          type: "string",
          format: "binary",
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./images",
        filename: (req, file, cb) => {
          const fileName: string =
            path.parse(file.originalname).name.replace(/\s/g, "") + Date.now();
          const extension: string = path.parse(file.originalname).ext;

          cb(null, `${fileName}${extension}`);
        },
      }),
    })
  )
  public async uploadProfilePicture(
    @AuthUser() authedUser: BearerPayload,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5000000 }), //bytes
          new FileTypeValidator({ fileType: "image" }),
        ],
      })
    )
    file: Express.Multer.File
  ) {
    try {
      const profile_pic = await this.fileService.uploadProfilePicture(
        await authedUser.getUser(),
        file.filename
      );
      return { profile_pic: profile_pic };
    } catch (e) {
      throw new HttpException((<Error>e).message, 400);
    }
  }

  @Get("profile-picture/:filename")
  findProfilePicture(
    @Param("filename") filename: string,
    @Res() res
  ): Observable<any> {
    return res.sendFile(join(process.cwd(), "images/" + filename));
  }
}
