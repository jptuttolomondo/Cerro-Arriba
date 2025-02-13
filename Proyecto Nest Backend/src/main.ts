import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//import * as fs from 'fs';
//import * as path from 'path';
import * as os from 'os';
//const certPath = path.resolve(__dirname, '../../certs');
async function bootstrap() {
  // const httpsOptions = {
  //   key: fs.readFileSync(path.join(certPath, 'serverLibre.key')),
  //   cert: fs.readFileSync(path.join(certPath, 'serverLibre.crt')),
  // };

  const app = await NestFactory.create(AppModule, {
    // httpsOptions
  });
  app.enableCors({
    origin: '*', // Permite cualquier origen (solo para pruebas, en producción debe ser más restrictivo)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  // {
  //   origin: process.env.FRONTEND, // Origen permitido
  //   methods: 'GET,POST,PUT,PATCH,DELETE', // Métodos permitidos
  //   allowedHeaders: 'Content-Type,Authorization', // Encabezados permitidos
  //   credentials: true, // Permitir cookies o credenciales
  // }
  const host = '0.0.0.0'; // Asegura que escucha en todas las IPs
  const port = process.env.PORT || 3000;
  await app.listen(port, host);

  console.log(`🚀 Backend running at http://localhost:${port}`);
  console.log(`🌍 Accessible at: http://${getLocalIP()}:${port}`);

  function getLocalIP() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
      for (const iface of interfaces[name]) {
        if (iface.family === 'IPv4' && !iface.internal) {
          return iface.address; // Devuelve la IP de la red local
        }
      }
    }
    return 'localhost';
  }
}
bootstrap();
