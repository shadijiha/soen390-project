import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator'
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators'
import { Connection } from '../../models/connection.entity'
import { Repository } from 'typeorm/repository/Repository'
import { PusherService } from '../../util/pusher/pusher.service'
import { UsersService } from '../users.service'
@Injectable()
export class ConnectionsService {
  constructor (
    @InjectRepository(Connection)
    private readonly connectionRepository: Repository<Connection>, private readonly pusherService: PusherService, private readonly usersService: UsersService
  ) {}

  public async addConnection (user1Id: number, user2Id: number): Promise<void> {
    if (user1Id === user2Id) throw new Error('Illegal request!')
    const connection = new Connection()
    connection.user_1 = user1Id as any // user1Id is the one who sent the request
    connection.user_2 = user2Id as any // user2Id is the one who received the request
    const user1 = await this.usersService.findOneByIdNoRelations(user1Id)
    await connection.save().then(async (): Promise<any> => {
      await this.pusherService.triggerNotification(`user-${user2Id}`, 'friend-request', { user: { id: user1Id, firstName: user1.firstName, lastName: user1.lastName, profilePic: user1.profilePic, timestamp: 'Just now' } })
    }).catch((err: any) => {
      return err
    })
  }

  public async deleteConnection (user1Id: number, user2Id: number): Promise<{ success: boolean, message: string }> {
    if (user1Id === user2Id) throw new Error('No connection found!')
    const connection = await this.connectionRepository.findOne({
      where: [
        { user_1: { id: user1Id }, user_2: { id: user2Id } },
        { user_1: { id: user2Id }, user_2: { id: user1Id } }
      ]
    })

    if (connection == null) throw new Error('No connection found!')
    else {
      await this.connectionRepository.delete({ id: connection.id })
      return {
        success: true,
        message: 'Connection delete successfully'
      }
    }
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

  public async getConnectionStatus (
    user1Id: number,
    user2Id: number
  ): Promise<'Connected' | 'Pending' | 'NotConnected'> {
    const connection = await this.connectionRepository.findOne({
      where: [
        { user_1: { id: user1Id }, user_2: { id: user2Id } },
        { user_1: { id: user2Id }, user_2: { id: user1Id } }
      ]
    })
    if (connection != null) { return connection.isAccepted ? 'Connected' : 'Pending' } else return 'NotConnected'
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
      const user =
        connection.user_1.id === userId ? connection.user_2 : connection.user_1
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
}
