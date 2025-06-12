import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { GlpiModule } from '../glpi/glpi.module';

@Module({
  imports: [GlpiModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}