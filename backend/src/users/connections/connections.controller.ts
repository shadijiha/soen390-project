import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards
} from '@nestjs/common/decorators'
import { HttpException } from '@nestjs/common/exceptions/http.exception'
import { ApiBearerAuth } from '@nestjs/swagger/dist/decorators/api-bearer.decorator'
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator'
import { JwtAuthGuard } from '../../auth/jwt-auth.guard'
import { AuthUser, BearerPayload } from '../../util/util'
import { ConnectionsService } from '../../users/connections/connections.service'
import { Connections } from '../../users/connections/connections.types'

@Controller('connections')
@ApiTags('Connections')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ConnectionsController {
  constructor (private readonly connectionService: ConnectionsService) {}

  /* A POST request to the endpoint /connections/add. It is sending a connection request to another user. */
  @Post('add')
  public async sendConnectionRequest (
    @AuthUser() userInfo: BearerPayload,
      @Body() body: Connections.AddConnectionRequest
  ): Promise<void> {
    try {
      await this.connectionService.addConnection(userInfo.id, body.toUser)
    } catch (e) {
      throw new HttpException((e as Error).message, 400)
    }
  }

  /* Deleting a connection. */
  @Delete('delete/:id')
  public async removeConnection (
    @AuthUser() userInfo: BearerPayload,
      @Param('id') id: number
  ): Promise<any> {
    try {
      return await this.connectionService.deleteConnection(userInfo.id, id)
    } catch (e) {
      throw new HttpException((e as Error).message, 400)
    }
  }

  /* A GET request to the endpoint /connections/status/:id. It is used to get the connection status
between two users. */
  @Get('status/:id')
  public async getConnectionStatus (
    @AuthUser() userInfo: BearerPayload,
      @Param('id') user2Id: number
  ): Promise<'Connected' | 'Pending' | 'NotConnected'> {
    try {
      return await this.connectionService.getConnectionStatus(
        userInfo.id,
        user2Id
      )
    } catch (e) {
      throw new HttpException((e as Error).message, 400)
    }
  }

  /* Getting the pending connection requests. */
  @Get('pending')
  public async getPendingRequest (
    @AuthUser() userInfo: BearerPayload
  ): Promise<any> {
    try {
      return await this.connectionService.getPendingConnections(userInfo.id)
    } catch (e) {
      throw new HttpException((e as Error).message, 400)
    }
  }

  /* Getting the accepted connection requests. */
  @Get('accepted')
  public async getAcceptedRequests (
    @AuthUser() userInfo: BearerPayload
  ): Promise<any> {
    try {
      return await this.connectionService.getAcceptedConnections(userInfo.id)
    } catch (e) {
      throw new HttpException((e as Error).message, 400)
    }
  }

  /* Accepting a connection request. */
  @Put('accept')
  public async acceptConnectionRequest (
    @AuthUser() userInfo: BearerPayload,
      @Body() body: Connections.AcceptConnectionRequest
  ): Promise<any> {
    try {
      return await this.connectionService.acceptConnection(
        body.id,
        userInfo.id
      )
    } catch (e) {
      throw new HttpException((e as Error).message, 400)
    }
  }
}
