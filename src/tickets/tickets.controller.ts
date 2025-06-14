import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly service: TicketsService) {}

  @Get()
  async getAll() {
    const tickets = await this.service.getAllTickets();
    if (!tickets) throw new NotFoundException('Nenhum ticket encontrado!');
    return tickets;
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    const ticket = await this.service.getTicketById(id);
    if (!ticket) throw new NotFoundException('Ticket não encontrado!');
    return ticket;
  }

  @Post()
  async createTicket(@Body() body: CreateTicketDto) {
    const created = await this.service.createTicket(body);
    if (!created) throw new NotFoundException('Não foi possível criar o ticket!');
    return created;
  }

  @Put(':id/status')
  async updateStatus(@Param('id') id: number, @Body('status') status: number) {
    return this.service.updateTicketStatus(id, status);
  }

  @Put(':id/user')
  async updateUser(@Param('id') id: number, @Body('userId') userId: number) {
    return this.service.updateTicketUser(id, userId);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.service.deleteTicket(id);
  }
}
