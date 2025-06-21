import { Injectable } from '@nestjs/common';
import { GlpiService } from '../glpi/glpi.service';
import { CreateTicketDto } from './dto/create-ticket.dto';

@Injectable()
export class TicketsService {
  constructor(private readonly glpi: GlpiService) {}

 async getAllTickets() {
    try {
      const getAllTickets = await this.glpi.getAllTickets()
      return getAllTickets;
    } catch (error) {
      console.error('Erro na função getAllTickets')
    }
  }

 async getTicketById(id: number) {
    try {
      const getTicketById = await this.glpi.getTicketById(id)
      return getTicketById;
    } catch (error) {
      console.error('Ticket' ,id, 'não encontrado')
    }
  }

 async createTicket(data: CreateTicketDto) {
    try {
      const payload = {
        input: {
          name: data.name,
          content: data.content,
          entities_id: Number(process.env.GLPI_ENTITY_ID) || 0,
          status: 1, // Novo
          users_id_recipient: data.users_id_recipient, // Solicitante
          type: data.type ?? 1, // 1 = Incidente por padrão
          requesttypes_id: data.requesttypes_id ?? 1, // 1 = Telefone (exemplo)
          urgency: data.urgency ?? 3,
          impact: data.impact ?? 3,
          priority: data.priority ?? 3,
          ...(data.user_id && { _users_id_assign: data.user_id }), // Atribuição opcional
        },
      };

      const response = await this.glpi.createTicket(payload);
      return response;

    } catch (error) {
      console.error('Erro na função createTicket:', error.message || error);
      throw error;
    }
  }

 async updateTicketStatus(id: number, status: number) {
    try {
      const updateStatus = await this.glpi.updateTicketStatus(id, status)
      return updateStatus;
    } catch (error) {
      console.error('Erro na função updateTicketStatus')
    }
}

 async updateTicketUser(id: number, userId: number) {
    try {
      const updateTicketUser = await this.glpi.updateTicketUser(id, userId);
      return updateTicketUser;
    } catch (error) {
      console.error('Erro na função updateTicketUser ')
    }
  }

  async deleteTicket(id: number) {
    try {
      const deleteTicket = await this.glpi.deleteTicket(id)
      return  deleteTicket;
    } catch (error) {
      console.error('Erro na função deleteTicket')
    } 
  }
}
