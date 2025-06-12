import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class GlpiService {
  private sessionToken: string | null = null;

  private api = axios.create({
    baseURL: process.env.GLPI_API_URL + '/apirest.php',
    headers: { 'App-Token': process.env.GLPI_APP_TOKEN }
  });

  private async ensureSession() {
    if (!this.sessionToken) {
      const res = await this.api.get('/initSession', {
        headers: { Authorization: 'user_token ' + process.env.GLPI_USER_TOKEN }
      });
      this.sessionToken = res.data.session_token;
    }
  }

  async getTicketById(id: number) {
    await this.ensureSession();
    const res = await this.api.get('/Ticket/' + id, {
      headers: { 'Session-Token': this.sessionToken }
    });
    return res.data;
  }

  async getAllTickets() {
    await this.ensureSession();
    const res = await this.api.get('/Ticket', {
      headers: { 'Session-Token': this.sessionToken }
    });
    return res.data;
  }

  async createTicket(data: any) {
    await this.ensureSession();
    const res = await this.api.post('/Ticket', data, {
      headers: { 'Session-Token': this.sessionToken }
    });
    return res.data;
  }

  async updateTicketStatus(id: number, status: number) {
    await this.ensureSession();
    const res = await this.api.put('/Ticket/' + id, {
      input: { id, status }
    }, {
      headers: { 'Session-Token': this.sessionToken }
    });
    return res.data;
  }

  async updateTicketUser(ticketId: number, userId: number) {
    await this.ensureSession();
    const res = await this.api.post('/Ticket_User', {
      input: {
        tickets_id: ticketId,
        users_id: userId,
        type: 2
      }
    }, {
      headers: { 'Session-Token': this.sessionToken }
    });
    return res.data;
  }

  async deleteTicket(id: number) {
    await this.ensureSession();
    const res = await this.api.delete('/Ticket/' + id, {
      headers: { 'Session-Token': this.sessionToken }
    });
    return res.data;
  }

  async getAllUsers() {
    await this.ensureSession();
    const res = await this.api.get('/User', {
      headers: { 'Session-Token': this.sessionToken }
    });
    return res.data;
  }

  async getUserById(id: number) {
    await this.ensureSession();
    const res = await this.api.get('/User/' + id, {
      headers: { 'Session-Token': this.sessionToken }
    });
    return res.data;
  }
}