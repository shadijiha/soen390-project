import { ApiProperty } from "@nestjs/swagger";

export namespace App {
	export enum Status {
		Success = "Success",
		Failed = "Failed",
		Async = "Async",
		Unknown = "Unknown",
	}
	export class WithStatus {
		@ApiProperty({
			enum: Status,
		})
		status?: Status = Status.Success;

		@ApiProperty()
		errors?: string[] = [];
	}
}
