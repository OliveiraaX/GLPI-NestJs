import { Injectable } from '@nestjs/common';
import { GlpiService } from '../glpi/glpi.service';

@Injectable()
export class UsersService {
  constructor(private readonly glpi: GlpiService) {}

  // LISTAR TODOS OS USUARIOS
  getAllUsers() {
    return this.glpi.getAllUsers();
  }

  // LISTAR USUÁRIO POR ID
  getUserById(id: number) {
    return this.glpi.getUserById(id);
  }

//   createUsers(data: any) {
//     return this.glpi.createUsers(data);
//   }
// 
}