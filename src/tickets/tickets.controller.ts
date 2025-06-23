import { Controller, Get, Post, Patch, Delete, Param, Body, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto, UpdateStatusDto } from './dto/create-ticket.dto';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly service: TicketsService) {}

  @Get()
  async read() {
    const tickets = await this.service.getAllTickets();
    return tickets;
  }

  @Get(':id')
  async readOne(@Param('id') id: number) {
    const ticket = await this.service.getTicketById(id);
    return ticket;
  }

  @Post()
  async createTicket(@Body() body: CreateTicketDto) {
    const created = await this.service.createTicket(body);
    return created;
  }

  @Patch()
  async updateStatus(@Body () body: UpdateStatusDto ) {
    return this.service.updateTicketStatus(body.id,body.status);
  }

  @Patch(':id/user')
  async updateUser(@Param('id') id: number, @Body('userId') userId: number) {
    return this.service.updateTicketUser(id, userId);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.service.deleteTicket(id);
  }
}
