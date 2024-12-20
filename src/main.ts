import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // {
  //   origin: process.env.FRONTEND, // Origen permitido
  //   methods: 'GET,POST,PUT,PATCH,DELETE', // Métodos permitidos
  //   allowedHeaders: 'Content-Type,Authorization', // Encabezados permitidos
  //   credentials: true, // Permitir cookies o credenciales
  // }
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
