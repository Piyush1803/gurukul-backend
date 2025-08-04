import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    
  app.enableCors({
    origin: ['http://localhost:5173', 'http://192.168.0.188:5173'],
    
    credentials: true, // optional: use if you're dealing with cookies/session
  });
  
  await app.listen(process.env.PORT ?? 3001);
  console.log(`🚀 App running on port ${process.env.PORT}`);
}
bootstrap();
