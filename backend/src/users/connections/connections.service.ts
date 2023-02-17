import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator'
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators'
import { Connection } from '../../models/connection.entity'
import { Repository } from 'typeorm/repository/Repository'

@Injectable()
export class ConnectionsService {
  constructor (
    @InjectRepository(Connection)
    private readonly connectionRepository: Repository<Connection>
  ) {}

  public async addConnection (user1Id, user2Id): Promise<void> {
    const connection = new Connection()
    connection.user_1 = user1Id
    connection.user_2 = user2Id
    await connection.save()
  }

  public async getPendingConnections (userId: number): Promise<any[]> {
    const connections = await this.connectionRepository
      .createQueryBuilder('connection')
      .leftJoinAndSelect('connection.user_1', 'user_1')
      .leftJoinAndSelect('connection.user_2', 'user_2')
      .where('user_2.id = :userId', { userId })
      .andWhere('isAccepted=false')
      .getMany()

    return connections.map((connection) => {
      return { user: connection.user_1, since: connection.updated_at }
    })
  }

  public async getConnectionStatus (user1Id: number, user2Id: number): Promise<'Connected' | 'Pending' | 'NotConnected'> {
    const connection = await this.connectionRepository.findOne({
      where: [
        { user_1: { id: user1Id }, user_2: { id: user2Id } },
        { user_1: { id: user2Id }, user_2: { id: user1Id } }
      ]
    })
    if (connection != null) return connection.isAccepted ? 'Connected' : 'Pending'
    else return 'NotConnected'
  }

  public async getAcceptedConnections (userId: number): Promise<any[]> {
    const connections = await this.connectionRepository
      .createQueryBuilder('connection')
      .leftJoinAndSelect('connection.user_1', 'user_1')
      .leftJoinAndSelect('connection.user_2', 'user_2')
      .where('user_1.id = :userId', { userId })
      .where('user_2.id = :userId', { userId })
      .andWhere('isAccepted = true')
      .getMany()

    return connections.map((connection) => {
      const user = connection.user_1.id === userId ? connection.user_2 : connection.user_1
      return { user, since: connection.updated_at }
    })
  }

  public async acceptConnection (user1Id, user2Id): Promise<any> {
    await this.connectionRepository.update(
      {
        user_1: user1Id,
        user_2: user2Id
      },
      { isAccepted: true }
    )

    return await this.getPendingConnections(user2Id)
  }

  public async rejectConnection (user1Id, user2Id): Promise<any> {
    await this.connectionRepository.delete({
      user_1: user1Id,
      user_2: user2Id
    })

    return await this.getPendingConnections(user2Id)
  }
}
