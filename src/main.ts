import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Serve all routes under the global API prefix
  app.setGlobalPrefix('api');

  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://192.168.0.188:5173',
      'https://gurukulbakery.com',
      'http://gurukulbakery.com',
    ],
    credentials: true, // optional: use if you're dealing with cookies/session
  });

  await app.listen(process.env.PORT ?? 3001);
  console.log(`🚀 App running on port ${process.env.PORT}`);
}
bootstrap();
