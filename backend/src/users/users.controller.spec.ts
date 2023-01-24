import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { dataSourceMockFactory } from "../util/mockDataSource";
import { DataSource } from "typeorm";
import { User } from "../models/user.entity";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

describe("UsersController", () => {
    let controller: UsersController;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: getRepositoryToken(User),
                    useValue: {},
                },
                { provide: DataSource, useFactory: dataSourceMockFactory }
            ],
            controllers: [UsersController],
        }).compile();
        controller = module.get<UsersController>(UsersController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
