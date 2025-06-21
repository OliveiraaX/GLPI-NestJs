import { Injectable, NotFoundException  } from '@nestjs/common';
import { GlpiService } from '../glpi/glpi.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { mapStatus, mapPriority,  } from './../utils/mappings';

@Injectable()
export class TicketsService {
  constructor(private readonly glpi: GlpiService) {}

async getAllTickets() {
  try {
    const allTickets = await this.glpi.getAllTickets();

    return allTickets.map(ticket => ({
      id: ticket.id,
      status: mapStatus(ticket.status),
      title: ticket.name,
      description: ticket.content,
      type: ticket.type,
      creatorBy: ticket.users_id_recipient,
      lastUpdater: ticket.users_id_lastupdater,
      urgency: ticket.urgency,
      impact: ticket.impact,
      priority: mapPriority(ticket.priority),
      requestType: ticket.requesttypes_ticket,
      createdAt: ticket.date,
      updatedAt: ticket.date_mod,
      solvedAt: ticket.solvedate,
      closedAt: ticket.closedate,
    }));

  } catch (error) {
    console.error('Erro na função getAllTickets:');
    throw new NotFoundException;
  }
}

async getTicketById(id: number) {
  try {
    const ticket = await this.glpi.getTicketById(id);

    return {
      id: ticket.id,
      status: mapStatus(ticket.status),
      title: ticket.name,
      description: ticket.content,
      type: ticket.type,
      creatorBy: ticket.users_id_recipient,
      lastUpdater: ticket.users_id_lastupdater,
      urgency: ticket.urgency,
      impact: ticket.impact,
      priority: mapPriority(ticket.priority),
      requestType: ticket.requesttypes_id,
      createdAt: ticket.date,
      updatedAt: ticket.date_mod,
      solvedAt: ticket.solvedate,
      closedAt: ticket.closedate,
    };

  } catch (error) {
    console.error('Erro na função: getTicketById');
    throw new NotFoundException;
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
        type: data.type ?? 1, // 1 = Incidente - 2 = Requisição
        urgency: data.urgency ?? 3,
        impact: data.impact ?? 3,
        priority: data.priority ?? 3,
        ...(data.atribuir && { _users_id_assign: data.atribuir }), // Atribuição
        },
      };

    const response = await this.glpi.createTicket(payload);
    const dataTicket = await this.glpi.getTicketById(response.id);

    return {
      message: 'Ticket criado com sucesso.',
      id:dataTicket.id,
      data: {
        name: dataTicket.name,
        title: dataTicket.content,
        status: mapStatus(dataTicket.status),
        priority: mapPriority(dataTicket.priority),
        },
    };
  } catch (error) {
    console.error('Erro na função createTicket:');
    throw new NotFoundException;
  }
}

async updateTicketStatus(id: number, status: number) {
  try {
    const updateStatus = await this.glpi.updateTicketStatus(id, status)
    return updateStatus;
  } catch (error) {
    console.error('Erro na função updateTicketStatus')
    throw new NotFoundException;
  }
}

async updateTicketUser(id: number, userId: number) {
  try {
      const updateTicketUser = await this.glpi.updateTicketUser(id, userId);
      return updateTicketUser;
} catch (error) {
      console.error('Erro na função updateTicketUser ')
      throw new NotFoundException;
  }
}

async deleteTicket(id: number) {
  try {
    const deleteTicket = await this.glpi.deleteTicket(id)
    return  deleteTicket;
  } catch (error) {
    console.error('Erro na função deleteTicket')
    throw new NotFoundException;
  } 
}
}
