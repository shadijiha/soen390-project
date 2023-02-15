import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Connection } from "src/models/connection.entity";
import { Repository } from "typeorm";

@Injectable()
export class ConnectionsService {
  constructor(
    @InjectRepository(Connection)
    private connectionRepository: Repository<Connection>,
  ) {}

  public async addConnection(user1Id, user2Id) {
    const connection = new Connection();
    connection.user_1 = user1Id;
    connection.user_2 = user2Id;
    await connection.save();
  }

  public async getPendingConnections(userId: number): Promise<any[]> {
    const connections = await this.connectionRepository
      .createQueryBuilder("connection")
      .leftJoinAndSelect("connection.user_1", "user_1")
      .leftJoinAndSelect("connection.user_2", "user_2")
      .where("user_2.id = :userId", { userId })
      .andWhere("isAccepted=false")
      .getMany();

    return connections.map((connection) => {
      return { user: connection.user_1, since: connection.updated_at };
    });
  }

  public async getConnectionstatus(
    user1Id: number,
    user2Id: number
  ): Promise<any> {
    const connection = await this.connectionRepository.findOne({
      where: [
        { user_1: {id: user1Id}, user_2: {id: user2Id} },
        { user_1: {id: user2Id}, user_2: {id: user1Id} },
      ],
    });
    if(connection) return {isAccepted: connection.isAccepted};
    else return "Users are not connected"
  }

  public async getAcceptedConnections(userId: number): Promise<any[]> {
    const connections = await this.connectionRepository
      .createQueryBuilder("connection")
      .leftJoinAndSelect("connection.user_1", "user_1")
      .leftJoinAndSelect("connection.user_2", "user_2")
      .where("user_1.id = :userId OR user_2.id = :userId", { userId })
      .andWhere("isAccepted=true")
      .getMany();

    return connections.map((connection) => {
      let user =
        connection.user_1.id === userId ? connection.user_2 : connection.user_1;
      return { user: user, since: connection.updated_at };
    });
  }
  public async acceptConnection(user1Id, user2Id) {
    await this.connectionRepository.update(
      {
        user_1: user1Id,
        user_2: user2Id,
      },
      { isAccepted: true }
    );

    return this.getPendingConnections(user2Id);
  }

  public async rejectConnection(user1Id, user2Id) {
    await this.connectionRepository.delete({
      user_1: user1Id,
      user_2: user2Id,
    });

    return this.getPendingConnections(user2Id);
  }
}
