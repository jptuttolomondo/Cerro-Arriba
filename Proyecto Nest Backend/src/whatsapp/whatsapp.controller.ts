import { Controller, Post, Body } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';

@Controller('whatsapp') // Ahora tienes un endpoint /whatsapp
export class WhatsappController {
  constructor(private readonly whatsappService: WhatsappService) {}

  @Post()
  async sendMessage(@Body() body: { phoneNumber: string; message: string }) {
    return this.whatsappService.sendMessage(body.phoneNumber, body.message);
  }
}
