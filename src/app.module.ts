import { Module } from '@nestjs/common';
import { TicketsModule } from './tickets/tickets.module';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { TicketsController } from './tickets/tickets.controller';
import { GlpiModule } from './glpi/glpi.module';

@Module({
  imports: [
    GlpiModule,
    TicketsModule,
    UsersModule,
  ],
})
export class AppModule {}
