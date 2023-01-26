import { TypeOrmModule } from "@nestjs/typeorm";

export function setupTestDB() {
  return [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: ":memory:",
      dropSchema: true,
      // 	name: process.env.DB_NAME,
      //   	username: process.env.DB_USERNAME,
     
      
      entities: ["dist/models/**/*.entity.{ts,js}"],
      synchronize: true,
    }),
  ];
}
