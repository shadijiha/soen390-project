import { Body, Controller, Delete, Get, HttpException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthUser, BearerPayload } from 'src/util/util';
import { ConnectionsService } from './connections.service';
import { Connections } from './connections.types';

@Controller('connections')
@ApiTags("Connections")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ConnectionsController {
    constructor(private connectionService: ConnectionsService){

    }

    @Post("add")
    public async sendConnectionRequest(
        @AuthUser() userInfo: BearerPayload,
        @Body() body: Connections.AddConnectionRequest
    ){
        try {
           await this.connectionService.addConnection(userInfo.id, body.toUser);
        } catch (e) {
            throw new HttpException((<Error>e).message, 400);
        }
    }

    @Get("status/:id")
    public async getConnectionStatus(
        @AuthUser() userInfo: BearerPayload,
        @Param("id") user2Id: number
    ){
        try {
            return await this.connectionService.getConnectionstatus(userInfo.id, user2Id);
         } catch (e) {
             throw new HttpException((<Error>e).message, 400);
         }
    }

    @Get("pending")
    public async getPendingRequest(
        @AuthUser() userInfo: BearerPayload,
    ){
        try {
            return await this.connectionService.getPendingConnections(userInfo.id);
         } catch (e) {
             throw new HttpException((<Error>e).message, 400);
         }
    }

    @Get("accepted")
    public async getAcceptedRequests(
        @AuthUser() userInfo: BearerPayload,
    ){
        try {
            return await this.connectionService.getAcceptedConnections(userInfo.id);
         } catch (e) {
             throw new HttpException((<Error>e).message, 400);
         }
    }

    @Put("accept")
    public async acceptConnectionRequest(
        @AuthUser() userInfo: BearerPayload, 
        @Body() body: Connections.AcceptConnectionRequest
    ){
        try {
            return await this.connectionService.acceptConnection(body.id, userInfo.id);
         } catch (e) {
             throw new HttpException((<Error>e).message, 400);
         }
    }

    @Delete("reject")
    public async rejectConnectionRequest(
        @AuthUser() userInfo: BearerPayload, 
        @Body() body: Connections.AcceptConnectionRequest
    ){
        try {
            return await this.connectionService.rejectConnection(body.id, userInfo.id);
         } catch (e) {
             throw new HttpException((<Error>e).message, 400);
         }
    }

}
