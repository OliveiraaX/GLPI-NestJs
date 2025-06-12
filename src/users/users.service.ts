import { Injectable } from '@nestjs/common';
import { GlpiService } from '../glpi/glpi.service';

@Injectable()
export class UsersService {
  constructor(private readonly glpi: GlpiService) {}

  getAllUsers() {
    return this.glpi.getAllUsers();
  }

  getUserById(id: number) {
    return this.glpi.getUserById(id);
  }
}