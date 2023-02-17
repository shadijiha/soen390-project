import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common/decorators'
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
  constructor (private readonly connectionService: ConnectionsService) {

  }

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

  @Get('status/:id')
  public async getConnectionStatus (
    @AuthUser() userInfo: BearerPayload,
      @Param('id') user2Id: number
  ): Promise<"Connected" | "Pending" | "NotConnected"> {
    try {
      return await this.connectionService.getConnectionStatus(userInfo.id, user2Id)
    } catch (e) {
      throw new HttpException((e as Error).message, 400)
    }
  }

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

  @Put('accept')
  public async acceptConnectionRequest (
    @AuthUser() userInfo: BearerPayload,
      @Body() body: Connections.AcceptConnectionRequest
  ): Promise<any> {
    try {
      return await this.connectionService.acceptConnection(body.id, userInfo.id)
    } catch (e) {
      throw new HttpException((e as Error).message, 400)
    }
  }

  @Delete('reject')
  public async rejectConnectionRequest (
    @AuthUser() userInfo: BearerPayload,
      @Body() body: Connections.AcceptConnectionRequest
  ): Promise<any> {
    try {
      return await this.connectionService.rejectConnection(body.id, userInfo.id)
    } catch (e) {
      throw new HttpException((e as Error).message, 400)
    }
  }
}
