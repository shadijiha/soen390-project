import { TypeOrmModule } from "@nestjs/typeorm";

export function setupTestDB() {
	return [
		TypeOrmModule.forRoot({
			name: "default",
			type: "mysql",
			database: ":memory:",
			entities: ["dist/models/**/*.entity.{ts,js}"],
			synchronize: true,
		}),
	];
}
