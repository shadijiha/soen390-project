import { Test, TestingModule } from "@nestjs/testing";
import { BearerPayload } from "src/util/util";
import { ConnectionsController } from "./connections.controller";
import { ConnectionsService } from "./connections.service";
import { Connections } from "./connections.types";

describe("ConnectionsController", () => {
  let controller: ConnectionsController;
  const mockConnectionsService = {
    addConnection: jest.fn(() => {}),
    getConnectionstatus: jest.fn(() => "pending"),
    getPendingConnections: jest.fn(() => {
      return {
          user: { id: 2}
        }
    }),

    getAcceptedConnections: jest.fn(() => {
      return {
        user: { id: 2},
        Since: new Date('2021-01-01')
      }
    }),

  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConnectionsController],
      providers: [ConnectionsService],
    })
      .overrideProvider(ConnectionsService)
      .useValue(mockConnectionsService)
      .compile();

    controller = module.get<ConnectionsController>(ConnectionsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should send connection request", () => {
    const bearer: BearerPayload = { id: 1, email: "test@gmail.com" } as BearerPayload;
    const connRequest: Connections.AddConnectionRequest = { toUser: 2 };

    controller.sendConnectionRequest(bearer, connRequest);

    expect(mockConnectionsService.addConnection).toBeCalledWith(bearer.id, connRequest.toUser);
  });

  it("should get connection status", async () => {
    const bearer: BearerPayload = { id: 1, email: "test@gmail.com" } as BearerPayload;
    const userId2 = 2;

    expect(await controller.getConnectionStatus(bearer, userId2)).toEqual("pending");
    expect(mockConnectionsService.getConnectionstatus).toBeCalledWith(bearer.id, userId2);
  });



  it("should get pending requests", async () => {
    const bearer: BearerPayload = { id: 1, email: "test@gmail.com" } as BearerPayload;

    expect(await controller.getPendingRequest(bearer)).toEqual({user: { id: 2}});
    expect(mockConnectionsService.getPendingConnections).toHaveBeenCalled();
  });

  it("should get accepted requests", async () => {
    const bearer: BearerPayload = { id: 1, email: "test@gmail.com" } as BearerPayload;

    expect(await controller.getAcceptedRequests(bearer)).toEqual({user: { id: 2}, Since: new Date('2021-01-01')});
    expect(mockConnectionsService.getAcceptedConnections).toHaveBeenCalled();
  });


});
