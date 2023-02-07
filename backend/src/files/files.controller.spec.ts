import { Test, TestingModule } from "@nestjs/testing";
import { FileController } from "./files.controller";
import { FileService } from "./files.service";

describe("FileController", () => {
  let controller: FileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileController],
      providers: [FileService],
    }).compile();

    controller = module.get<FileController>(FileController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
