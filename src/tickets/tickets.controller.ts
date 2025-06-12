import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { TicketsService } from './tickets.service';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly service: TicketsService) {}

  @Get()
  getAll() {
    return this.service.getAllTickets();
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.service.getTicketById(id);
  }

  @Post()
  create(@Body() body: any) {
    return this.service.createTicket(body);
  }

  @Put(':id/status')
  updateStatus(@Param('id') id: number, @Body('status') status: number) {
    return this.service.updateTicketStatus(id, status);
  }

  @Put(':id/user')
  updateUser(@Param('id') id: number, @Body('userId') userId: number) {
    return this.service.updateTicketUser(id, userId);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.service.deleteTicket(id);
  }
}