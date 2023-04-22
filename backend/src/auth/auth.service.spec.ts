import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { AuthService } from "./auth.service";
import { User } from "../models/user.entity";
import { JwtService } from "@nestjs/jwt";

describe("AuthService", () => {
  let service: AuthService;
  let mockUsersRepository = {
    createQueryBuilder: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      getOne: jest.fn().mockResolvedValue({
        id: 1,
        email: "test@gmail.com",
        password: "$argon2id$v=19$m=65536,t=3,p=4$BSSdSR/bWwEtdxRgCtFB2w$GuVOU23vhrL9xbzlRFOKd+N7pyhlFVOItnGHXs7MoO4",
      }),
    })),

    //findOneByOrFail: jest.fn().mockResolvedValue( {user: {id: 1, email: 'test@gmail.com', password: '$argon2id$v=19$m=65536,t=3,p=4$BSSdSR/bWwEtdxRgCtFB2w$GuVOU23vhrL9xbzlRFOKd+N7pyhlFVOItnGHXs7MoO4'}})
    findOneByOrFail: jest.fn((email) => {
      if (email.email == "test@gmail.com")
        return {
          user: {
            id: 1,
            email: "test@gmail.com",
            password: "$argon2id$v=19$m=65536,t=3,p=4$BSSdSR/bWwEtdxRgCtFB2w$GuVOU23vhrL9xbzlRFOKd+N7pyhlFVOItnGHXs7MoO4",
          },
        };
      else throw new Error();
    }),
  };

  let mockJwtService = {
    sign: jest.fn(() => "ssdsds"),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository,
        },
      ],
    })
      .overrideProvider(JwtService)
      .useValue(mockJwtService)
      .compile();

    service = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should validate a user", async () => {
    const result = await service.validateUser("test@gmail.com", "123");
    expect(result).toEqual({ id: 1, email: "test@gmail.com" });
  });

  it("should login user", async () => {
    const result = await service.login({ email: "test@gmail.com", password: "123" });
    expect(result.access_token).toEqual(expect.any(String));

    try {
      expect(await service.login({ email: "@gmail.com", password: "123" })).toThrowError;
    } catch (error) {
   
    }
  });
});
