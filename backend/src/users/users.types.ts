/**
 * Types for Request and Respose
 */

import { ApiProperty } from "@nestjs/swagger";
import { Job } from "../models/job.entity";
import { App } from "../app.types";
import { User } from "../models/user.entity";

export namespace Users {
	export class GetAllUsersResponse extends App.WithStatus {
		@ApiProperty({ isArray: true, type: User })
		user: User[] | null;
	}

	export class GetUserResponse extends App.WithStatus {
		@ApiProperty({ type: User })
		user: User | null;
	}

	export class UpdateUserRequest {
		@ApiProperty({ required: false })
		firstName: string;

		@ApiProperty({ required: false })
		lastName: string;

		@ApiProperty({ required: false })
		email: string;

		@ApiProperty({ required: false })
		mobileNo: string;

		@ApiProperty({ examples: ["male", "female"], required: false })
		gender: "male" | "female" | "";

		@ApiProperty({ required: false })
		biography: string;

		@ApiProperty({
			type: "file",
			properties: {
				file: {
					type: "string",
					format: "binary",
				},
			},
			required: false,
		})
		profilePic: Express.Multer.File;

		@ApiProperty({
			type: "file",
			properties: {
				file: {
					type: "string",
					format: "binary",
				},
			},
			required: false,
		})
		coverPic: Express.Multer.File;
	}

	export class UpdateUserResponse extends App.WithStatus {
		@ApiProperty({ type: User })
		user: User | null;
	}

	export class SearchResponse {
		@ApiProperty({ type: [User] })
		users: User[];

		@ApiProperty({ type: [Job] })
		jobs: Job[];
	}

	export class GetUserByIdResponse extends App.WithStatus {
		@ApiProperty({ type: User })
		user: User | null;

		@ApiProperty({ enum: ["Connected", "Pending", "NotConnected"] })
		connectionStatus: "Connected" | "Pending" | "NotConnected";

		@ApiProperty({ type: User, isArray: true })
		connections: User[];
	}

	export class UpdateStatusRequest {
		@ApiProperty({ enum: ["online", "offline"] })
		userStatus: "online" | "offline";
	}

	export class AddDocumentsRequest {
		@ApiProperty({ type: "file", required: false })
		cv: Express.Multer.File;

		@ApiProperty({ type: "file", required: false })
		coverLetter: Express.Multer.File;
	}

	export class DeleteDocumentsRequest {
		@ApiProperty({ required: false })
		cv: boolean;

		@ApiProperty({ required: false })
		coverLetter: boolean;
	}

	export class ReportRequest {
		@ApiProperty({ enum: ["post", "chat"] })
		type: "post" | "chat";

		@ApiProperty()
		entity_id: number;
	}
}
