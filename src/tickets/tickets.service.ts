import { Injectable } from '@nestjs/common';
import { GlpiService } from '../glpi/glpi.service';

@Injectable()
export class TicketsService {
  constructor(private readonly glpi: GlpiService) {}

  getAllTickets() {
    return this.glpi.getAllTickets();
  }

  getTicketById(id: number) {
    return this.glpi.getTicketById(id);
  }

  createTicket(data: any) {
    return this.glpi.createTicket(data);
  }

  updateTicketStatus(id: number, status: number) {
    return this.glpi.updateTicketStatus(id, status);
  }

  updateTicketUser(id: number, userId: number) {
    return this.glpi.updateTicketUser(id, userId);
  }

  deleteTicket(id: number) {
    return this.glpi.deleteTicket(id);
  }
}