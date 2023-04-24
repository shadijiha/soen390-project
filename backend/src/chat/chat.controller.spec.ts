import { Test, TestingModule } from "@nestjs/testing";
import { ChatController } from "./chat.controller";
import { ChatService } from "./chat.service";
import { UsersService } from "../users/users.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { BearerPayload, createTestBearerPayload } from "../util/util";
import { User } from "../models/user.entity";
import { Repository } from "typeorm";
import { Readable } from "stream";
import { getRepositoryToken } from "@nestjs/typeorm";

describe("ChatController", () => {
    let controller: ChatController;
    let chatService: ChatService;
    let userService: Repository<User>;

    const mockChatService = {
        allConversations: jest.fn(() => []),
        conversation: jest.fn(() => []),
        message: jest.fn(() => { }),
        upload: jest.fn(() => ""),
    };

    const mockUsersService = {
        findOneByIdNoRelations: jest.fn((id) => {
            if (id === 1) {
                return { id: 1, firstName: "Test", lastName: "User" } as User;
            }
            return null;
        }),
    };

    const mockUsersRepository = {
        findOne: jest.fn((x) => {
            if (x.where.email == "") return null;
            if (x.where.email == "test@gmail.com") return { id: 1, type: "recruiter", jobs: [] };
            if (x.where.email == "error@gmail.com") return { id: 1, type: "jobseeker", jobs: [] };
        }),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ChatController],
            providers: [ChatService, UsersService, JwtAuthGuard, {
                provide: getRepositoryToken(User),
                useValue: mockUsersRepository,
            },],
        })
            .overrideProvider(ChatService)
            .useValue(mockChatService)
            .overrideProvider(UsersService)
            .useValue(mockUsersService)
            .compile();

        controller = module.get<ChatController>(ChatController);
        chatService = module.get<ChatService>(ChatService);
        userService = module.get(getRepositoryToken(User));
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });

    it("should get all conversations for a user", async () => {
        const bearer: BearerPayload = await createTestBearerPayload("test@gmail.com", userService);
        const result = await controller.allConversations(bearer);
        expect(chatService.allConversations).toHaveBeenCalled();
        expect(result).toBeInstanceOf(Array);
    });

    it("should get a conversation between two users", async () => {
        const bearer: BearerPayload = await createTestBearerPayload("test@gmail.com", userService);
        const withUserId = 2;
        const result = await controller.conversation(bearer, withUserId);
        expect(chatService.conversation).toHaveBeenCalled();
        expect(result).toBeInstanceOf(Array);
    });

    it("should send a message to another user", async () => {
        const bearer: BearerPayload = await createTestBearerPayload("test@gmail.com", userService);
        const messageRequest = {
            receiverId: 2,
            message: "Hello!",
        };
        const result = await controller.message(messageRequest, bearer);
        expect(chatService.message).toHaveBeenCalled();
    });

    it("should upload a file", async () => {
        const bearer: BearerPayload = await createTestBearerPayload("test@gmail.com", userService);
        const file: Express.Multer.File = {
            fieldname: "file",
            originalname: "test.txt",
            encoding: "7bit",
            mimetype: "text/plain",
            buffer: Buffer.from("Hello, World!"),
            size: 13,
            stream: new Readable(),
            destination: "",
            filename: "",
            path: ""
        };
        const result = await controller.upload(file, bearer);
        expect(chatService.upload).toHaveBeenCalled();
    });
});
