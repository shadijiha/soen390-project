import { Test, TestingModule } from "@nestjs/testing";
import { ConnectionsController } from "./connections.controller";
import { ConnectionsService } from "./connections.service";

describe("ConnectionsController", () => {
  let controller: ConnectionsController;
  const mockUserService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConnectionsController],
      providers: [
        ConnectionsService
      ],
    })
      .overrideProvider(ConnectionsService)
      .useValue(mockUserService)
      .compile();

    controller = module.get<ConnectionsController>(ConnectionsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
