import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { NotFoundError } from 'rxjs';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  async getAll() {
    const getAllUsers = await this.service.getAllUsers();
    return getAllUsers;
  }
  
  @Get(':id')
  async getUserById(@Param('id') id: number) {
    const getUser = await this.service.getUserById(id);
    return getUser;
  }

//   @Post()
//   async createUsers(@Body() body:any){
//   const createUser = await this.service.createUsers(body);
//   if (!createUser){
//    throw new NotFoundException('Erro ao criar usuário!')
//   }
//    return createUser;
//  }
}