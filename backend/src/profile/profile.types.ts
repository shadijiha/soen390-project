import { ApiProperty } from "@nestjs/swagger";
import { Education } from "src/models/education.entity";

export namespace Profile {
	export class ProfileAddEducationRequest {
		@ApiProperty()
		institution: string;

		@ApiProperty()
		degree: string;

		@ApiProperty()
		start_year: number;

		@ApiProperty()
		end_year: number;
	}
}
