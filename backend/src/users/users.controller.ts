import { Controller, Delete, Get, HttpStatus, Param, ParseIntPipe } from '@nestjs/common';
import { Body, HttpCode, Post, Put, UseGuards } from '@nestjs/common/decorators';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { response } from 'express';
import { Auth } from 'src/auth/auth.types';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/models/user.entity';
import { Code, DeleteResult } from 'typeorm';
import { UsersService } from './users.service';
import { Users } from './users.types';


@Controller('users')
@ApiTags("Users")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UsersController {
    
    constructor(
		private readonly usersService: UsersService	) {}

    
    @Get()
    @ApiResponse({type: Users.GetAllUsersResponse})
    async findAll(): Promise<User[]>{
          return this.usersService.findAll();
       
    }

    @Get(':id')
    @ApiResponse({type: Users.GetUserResponse})
    async findOneById(@Param('id', ParseIntPipe) id: number): Promise<User> {
      return this.usersService.findOneById(id);
    }


    @Put(':id')
    @ApiResponse({type: Users.UpdateUserResponse})
    update(@Param('id') id: number, @Body() user: Users.UpdateUserRequest): Promise<User>{
        return this.usersService.update(id, user);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<DeleteResult> {
      return this.usersService.remove(id);
    }




    

}