import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "../models/user.entity";
import { dataSourceMockFactory } from "../util/mockDataSource";
import { DataSource } from "typeorm";
import { UsersService } from "./users.service";

describe("UsersService", () => {
    let service: UsersService;
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
        }).compile();
        service = module.get<UsersService>(UsersService);
    });
    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});
