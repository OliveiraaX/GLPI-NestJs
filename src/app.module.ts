import { Module } from '@nestjs/common';
import { TicketsModule } from './tickets/tickets.module';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { TicketsController } from './tickets/tickets.controller';

@Module({
  imports: [
    TicketsModule,
    UsersModule,
  ],
})
export class AppModule {}
