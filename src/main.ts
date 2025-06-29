import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { APP_FILTER } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Definindo o prefixo global da API
  app.setGlobalPrefix('api');

  // Aplicando o ValidationPipe globalmente
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Aplicando o filtro de exceções globalmente
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000);
}
bootstrap();
