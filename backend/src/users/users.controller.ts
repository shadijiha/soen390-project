import { Controller, Delete, Get, Param, ParseIntPipe } from '@nestjs/common';
import { Body, HttpCode, Post, Put } from '@nestjs/common/decorators';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/auth.types';
import { User } from 'src/models/user.entity';
import { Code } from 'typeorm';
import { UsersService } from './users.service';


@Controller('users')
@ApiTags("Users")
export class UsersController {
    
    constructor(
		private readonly usersService: UsersService	) {}


    @Get()
    public async findAll(): Promise<User[]>{
        return this.usersService.findAll();
    }

    @Get(':id')
    findOneById(@Param('id', ParseIntPipe) id: number): Promise<User> {
      return this.usersService.findOneById(id);
    }


    @Put(':id')
    update(@Param('id') id: string, @Body() user: User){
        return this.usersService.update(user.id, user);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
      return this.usersService.remove(id);
    }




    

}