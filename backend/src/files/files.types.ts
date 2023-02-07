import { ApiProperty } from "@nestjs/swagger";
import { BaseRequest } from "src/util/util";

export namespace Files {
  export class ProfileAddProfilePictureRequest extends BaseRequest {
    //accept file upload
    //swagger file upload
    @ApiProperty()
    profilePicture: Express.Multer.File;
  }
}
