import { TypeOrmModule } from "@nestjs/typeorm";

export function setupTestDB() {
  return [
    TypeOrmModule.forRoot({
<<<<<<< HEAD
      name: "default",
      type: "mysql",
      database: ":memory:",
=======
      type: "sqlite",
      database: ":memory:",
      dropSchema: true,
      // 	name: process.env.DB_NAME,
      //   	username: process.env.DB_USERNAME,
     
      
>>>>>>> origin/master
      entities: ["dist/models/**/*.entity.{ts,js}"],
      synchronize: true,
    }),
  ];
}
