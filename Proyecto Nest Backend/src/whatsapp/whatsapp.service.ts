import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { Client, LocalAuth } from 'whatsapp-web.js';
import * as qrcode from 'qrcode-terminal';

@Injectable()
export class WhatsappService implements OnModuleInit {
  private client: Client;
  private readonly logger = new Logger(WhatsappService.name);

  constructor() {
    this.client = new Client({
      authStrategy: new LocalAuth({ dataPath: './whatsapp-session' }),
    });

    // Manejo de eventos
    this.client.on('qr', (qr) => {
      this.logger.log('Escanea este código QR con WhatsApp:');
      qrcode.generate(qr, { small: true });
    });

    this.client.on('ready', () => {
      this.logger.log('¡WhatsApp está listo para enviar mensajes!');
    });

    this.client.on('auth_failure', (msg) => {
      this.logger.error('Error de autenticación:', msg);
    });

    this.client.on('disconnected', (reason) => {
      this.logger.warn(`Cliente desconectado: ${reason}`);
    });

    this.client.on('disconnected', async (reason) => {
      this.logger.warn(`Cliente desconectado: ${reason}`);

      // Si no es un cierre de sesión manual (LOGOUT), intentamos reconectar
      if (reason !== 'LOGOUT') {
        this.logger.warn('Intentando reconectar en 5 segundos...');
        setTimeout(() => this.client.initialize(), 5000);
      }
    });
  }

  async onModuleInit() {
    this.logger.log('Inicializando servicio de WhatsApp...');
    this.client.initialize();
  }

  async sendMessage(phoneNumber: string, order: any) {
    const chatId = `${phoneNumber}@c.us`;
    console.log(phoneNumber);
    console.log(order);

    if (!this.client) {
      this.logger.error('El cliente de WhatsApp no está inicializado.');
      throw new Error('El cliente de WhatsApp no está inicializado.');
    }

    if (!this.client.info) {
      this.logger.error('El cliente de WhatsApp aún no está listo.');
      throw new Error('El cliente de WhatsApp aún no está listo.');
    }
    // Verificar si el número está registrado en WhatsApp
    const isRegistered = await this.client.isRegisteredUser(chatId);
    this.logger.log(
      `Número ${phoneNumber} registrado en WhatsApp: ${isRegistered}`,
    );

    if (!isRegistered) {
      this.logger.warn(`Número ${phoneNumber} no registrado en WhatsApp.`);
      throw new Error('Número no registrado en WhatsApp.');
    }

    const message = this.formatOrderMessage(order);

    return this.client.sendMessage(chatId, message);
  }

  private formatOrderMessage(order: any): string {
    const { cartItems, totalPrice, userDetails } = order;

    let message = `🛒 *Cerro Arriba Restaurante*\n\n`;
    message += `👤 *Cliente:* ${userDetails.name}\n`;
    message += `📍 *Dirección:* ${userDetails.location}\n`;
    message += `📱 *WhatsApp:* ${userDetails.whatsapp}\n`;
    message += `💳 *Método de pago:* ${userDetails.paymentMethod}\n`;
    message += `💳 *Ubicación indicada:* ${userDetails.locationCoords}\n`;
    message += `⏰ *Hora de entrega:* ${userDetails.deliveryTime}\n\n`;
    message += `📦 *Productos:*\n`;

    cartItems.forEach((item: any, index: number) => {
      message += `\n${index + 1}. ${item.product_name} - Cantidad: ${item.quantity} - Precio: $${item.price}`;
    });

    message += `\n\n💰 *Total: $${totalPrice}*\n`;
    message += `\n✅ ¡Gracias por tu compra!`;

    return message;
  }
}
