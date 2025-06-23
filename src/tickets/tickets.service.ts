import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { GlpiService } from '../glpi/glpi.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { mapStatus, mapPriority } from './../utils/mappings';

@Injectable()
export class TicketsService {
  constructor(private readonly glpi: GlpiService) {}

  // Obter todos os tickets
async getAllTickets() {
  try {
    const allTickets = await this.glpi.getAllTickets();

    // Mapeia cada ticket com as informações formatadas
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
    throw new NotFoundException();
  }
}

// Obter ticket por ID
async getTicketById(id: number) {
  try {
    const ticket = await this.glpi.getTicketById(id);

    // Retorna o ticket formatado
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
    throw new NotFoundException();
  }
}

// Criar novo ticket
async createTicket(data: CreateTicketDto) {
  try {
    // Monta o payload para envio ao GLPI
    const payload = {
      input: {
      name: data.name,
      content: data.content,
      entities_id: Number(process.env.GLPI_ENTITY_ID) || 0,
      status: 1, // Status padrão
      users_id_recipient: data.users_id_recipient, // Solicitante
      type: data.type ?? 1, // 1 = Incidente - 2 = Requisição
      urgency: data.urgency ?? 3,
      impact: data.impact ?? 3,
      priority: data.priority ?? 3,
      ...(data.atribuir && { _users_id_assign: data.atribuir }), // Atribuição se informada
     },
  };

   const response = await this.glpi.createTicket(payload);
   const dataTicket = await this.glpi.getTicketById(response.id);

   // Retorna os dados básicos do ticket recém-criado
   return {
     message: 'Ticket criado com sucesso.',
     id: dataTicket.id,
     data: {
       name: dataTicket.name,
       title: dataTicket.content,
       status: mapStatus(dataTicket.status),
       priority: mapPriority(dataTicket.priority),
     },
   };
 } catch (error) {
   console.error('Erro na função createTicket:');
   throw new NotFoundException();
 }
}

// ATUALIZAR STATUS DO TICKET
async updateTicketStatus(id: number, status: number) {
  try {
    // Busca o ticket atual
    const ticket = await this.glpi.getTicketById(id);

    // Verificar se ticket existe
    if (!ticket) {
      throw new NotFoundException();
    }

    // Salva o status antigo
    const oldStatus = ticket.status;

    // Atualiza o status do ticket
    await this.glpi.updateTicketStatus(id, status);

    // Retorna uma mensagem formatada com os status mapeados
    return {
      message: `Status atualizado com sucesso. ID: ${id}`,
      from: mapStatus(oldStatus),
      to: mapStatus(status),
    };

  } catch (error) {
    console.error('Erro na função updateTicketStatus');
    throw new NotFoundException();
  }
}

// Atribuir um usuário ao ticket
async updateTicketUser(id: number, userId: number) {
  try {
    // Busca o ticket atual
    const ticket = await this.glpi.getTicketById(id);
    if (!ticket) {
      throw new NotFoundException(`Ticket com ID ${id} não encontrado.`);
    }

    // Verifica se o usuário já está atribuído
    if (ticket.atribuir === userId) {
      throw new BadRequestException('Usuário já vinculado.');
    }
    // Atualiza a atribuição
    await this.glpi.updateTicketUser(id, userId);
    // Busca os dados do usuário para retornar o nome
    const user = await this.glpi.getUserById(userId);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    // Retorna o ID do ticket e o nome do novo responsável
    return {
      ticketId: id,
      assigned: user.name,
    };
  } catch (error) {
    if (error instanceof BadRequestException || error instanceof NotFoundException) {
      throw error;
    }
    console.error('Erro na função updateTicketUser:');
    throw new NotFoundException();
  }
}

// Excluir um ticket
async deleteTicket(id: number) {
  try {
    const deleteTicket = await this.glpi.deleteTicket(id);
    return deleteTicket;
  } catch (error) {
    console.error('Erro na função deleteTicket');
    throw new NotFoundException();
  }
}
}
