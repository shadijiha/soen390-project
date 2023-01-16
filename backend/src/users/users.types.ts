/**
 * Types for Request and Respose
 */

import { ApiProperty } from "@nestjs/swagger";
import { App } from "src/app.types";
import { User } from "src/models/user.entity";


export namespace Users {
    
    export class GetAllUsersRequest {
		
	}

	export class GetAllUsersResponse extends App.WithStatus {
		@ApiProperty({isArray: true, type: User })
		user: User[] | null;
	}

    export class GetUserResponse extends App.WithStatus {
		@ApiProperty({type: User })
		user: User | null;
	}


    export class UpdateUserRequest {
        @ApiProperty()
		firstName: string | null;

		@ApiProperty()
		lastName: string | null;

        @ApiProperty()
        email: string | null;

		@ApiProperty({ examples: ["male", "female"] })
		gender: "male" | "female" | null;
    }

    export class UpdateUserResponse extends App.WithStatus{
        @ApiProperty({type: User})
        user: User | null;
    }


}