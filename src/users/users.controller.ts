import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  getAll() {
    return this.service.getAllUsers();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.service.getUserById(id);
  }
}