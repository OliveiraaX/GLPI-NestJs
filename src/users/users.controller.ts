import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { NotFoundError } from 'rxjs';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  async getAll() {
    const getUsers = await this.service.getAllUsers();
    if (!getUsers){
      throw new NotFoundException('Nenhum usuário foi encontrado!')
    }
    return getUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: number) {
    const getUser = await this.service.getUserById(id);
    if (!getUser){
      throw new NotFoundException('Erro ao buscar usuário!')
    }
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