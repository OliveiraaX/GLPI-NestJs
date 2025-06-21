import { Injectable } from '@nestjs/common';
import { GlpiService } from '../glpi/glpi.service';
import { STATUS_CODES } from 'http';

@Injectable()
export class UsersService {
  constructor(private readonly glpi: GlpiService) {}

  // LISTAR TODOS OS USUARIOS
  async getAllUsers() {
    try {
      const allUsers = await this.glpi.getAllUsers(); 
      return allUsers;
    } catch (error) {
      console.error('Erro na função getAllUsers',error);
    }
  }

  // LISTAR USUÁRIO POR ID
async getUserById(id: number) {
  try {
    const allUser = await this.glpi.getUserById(id);
    return allUser;
  } catch (error) {
    console.error('Erro na funcao getUserById');
    }
}
//   createUsers(data: any) {
//     return this.glpi.createUsers(data);
//   }
// 
}