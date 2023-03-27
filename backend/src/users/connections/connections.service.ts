import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator'
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators'
import { Connection } from '../../models/connection.entity'
import { Repository } from 'typeorm/repository/Repository'
import { PusherService } from '../../util/pusher/pusher.service'
import { UsersService } from '../users.service'
import { type User } from '../../models/user.entity'
@Injectable()
export class ConnectionsService {
  constructor (
    @InjectRepository(Connection)
    private readonly connectionRepository: Repository<Connection>,
    private readonly pusherService: PusherService,
    private readonly usersService: UsersService
  ) {}

  /**
   * It adds a connection between two users and sends a notification to the user who received the request
   * @param {number} user1Id - The user who sent the request
   * @param {number} user2Id - number - the user who received the request
   */
  public async addConnection (user1Id: number, user2Id: number): Promise<void> {
    if (user1Id === user2Id) throw new Error('Illegal request!')
    const connection = new Connection()
    connection.user_1 = user1Id as any // user1Id is the one who sent the request
    connection.user_2 = user2Id as any // user2Id is the one who received the request
    const user1 = await this.usersService.findOneByIdNoRelations(user1Id)
    await connection
      .save()
      .then(async (): Promise<any> => {
        await this.pusherService.triggerNotification(`user-${user2Id}`, 'friend-request', {
          user: { id: user1Id, firstName: user1.firstName, lastName: user1.lastName, profilePic: user1.profilePic, timestamp: 'Just now' }
        })
      })
      .catch((err: any) => {
        return err
      })
  }

  /**
   * It deletes a connection between two users.
   * @param {number} user1Id - number, user2Id: number
   * @param {number} user2Id - number - The id of the user you want to delete the connection with
   * @returns The return type is a Promise of an object with two properties: success and message.
   */
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

  /**
   * It returns an array of users that are pending connection, with the date.
   * The function returns an
   * @param {number} userId - number - The user id of the user who is logged in
   * @returns An array of objects with the following structure:
   */
  public async getPendingConnections (userId: number): Promise<Array<{ user: User, since: Date }>> {
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

  /**
   * It returns "Connected" if the two users are connected, "Pending" if the connection is pending, and
   * "NotConnected" if the two users are not connected.
   * @param {number} user1Id - number, user2Id: number
   * @param {number} user2Id - number - The id of the user you want to check the connection status with
   * @returns The connection status between two users.
   */
  public async getConnectionStatus (user1Id: number, user2Id: number): Promise<'Connected' | 'Pending' | 'NotConnected'> {
    const connection = await this.connectionRepository.findOne({
      where: [
        { user_1: { id: user1Id }, user_2: { id: user2Id } },
        { user_1: { id: user2Id }, user_2: { id: user1Id } }
      ]
    })
    if (connection != null) {
      return connection.isAccepted ? 'Connected' : 'Pending'
    } else return 'NotConnected'
  }

  /**
   * "Get all connections where the user is either user_1 or user_2 and isAccepted is true"
   * @param {number} userId - number
   * @returns An array of objects with the following structure:
   */
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

  /**
   * It updates the connection between two users to be accepted, and then returns the pending connections
   * for the second user.
   * @param user1Id - the id of the user who sent the connection request
   * @param user2Id - the user who is accepting the connection
   * @returns An array of objects with user and since properties.
   */
  public async acceptConnection (user1Id, user2Id): Promise<Array<{ user: User, since: Date }>> {
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
