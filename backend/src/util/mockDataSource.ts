import { DataSource } from "typeorm";

// @ts-ignore
export const dataSourceMockFactory: () => MockType<DataSource> = jest.fn(
  () => ({
    findOneBy: jest.fn((entity) => entity),
    findOne: jest.fn((entity) => entity),
  })
);

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};
