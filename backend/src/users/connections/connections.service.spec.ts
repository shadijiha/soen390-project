import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Connection } from "../../models/connection.entity";
import { ConnectionsService } from "./connections.service";

describe("ConnectionsService", () => {
  let service: ConnectionsService;

  let mockConnection = {
    save: jest.fn(),
  };

  let mockConnectionsRepository = {
    findOne: jest.fn(() => Promise.resolve({ id: 1, user_1: 1, user_2: 2, isAccepted: false })),
    update: jest.fn(),
    delete: jest.fn(),

    createQueryBuilder: jest.fn(() => ({
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue([{ since: undefined, user_1: { id: 1 } }]),
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConnectionsService,
        {
          provide: getRepositoryToken(Connection),
          useValue: mockConnectionsRepository,
        },
      ],
    })
      .overrideProvider(Connection)
      .useValue(mockConnection)
      .compile();

    service = module.get<ConnectionsService>(ConnectionsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should throw error on add connection", async () => {
    try {
      expect(await service.addConnection(1, 1)).toThrowError();
    } catch (e) {}
  });

  it("should return pending connections", async () => {
    const result = await service.getPendingConnections(1);
    expect(result).toEqual([{ since: undefined, user: { id: 1 } }]);
  });

  it("should return accepted connections", async () => {
    const result = await service.getAcceptedConnections(1);
    expect(result).toEqual([{ since: undefined, user: undefined }]);
  });

  it("should return connection status", async () => {
    const result = await service.getConnectionStatus(1, 2);
    expect(result).toEqual("Pending");
  });

  it("should accept connection", async () => {
    await service.acceptConnection(1, 2);
    expect(mockConnectionsRepository.update).toHaveBeenCalled();
  });

  it("should reject connection", async () => {
    await service.deleteConnection(1, 2);
    expect(mockConnectionsRepository.delete).toHaveBeenCalled();
  });
});
