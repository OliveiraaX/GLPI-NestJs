import { Injectable } from '@nestjs/common';
import { GlpiService } from '../glpi/glpi.service';
import { CreateTicketDto } from './dto/create-ticket.dto';

@Injectable()
export class TicketsService {
  constructor(private readonly glpi: GlpiService) {}

  getAllTickets() {
    return this.glpi.getAllTickets();
  }

  getTicketById(id: number) {
    return this.glpi.getTicketById(id);
  }

  async createTicket(data: CreateTicketDto) {
    const payload = {
      input: {
        name: data.name,
        content: data.content,
        entities_id: Number(process.env.GLPI_ENTITY_ID) || 0,
        status: 1,
        type: 1,
        requesttypes_id: 1,
        urgency: data.urgency ?? 3,
        impact: data.impact ?? 3,
        priority: data.priority ?? 3,
        ...(data.user_id && { _users_id_assign: data.user_id })
      }
    };

    try {
      return await this.glpi.createTicket(payload);
    } catch (error) {
      console.error('Erro na funçãp createTicket');
      throw new Error('Falha ao criar ticket no GLPI');
    }
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
