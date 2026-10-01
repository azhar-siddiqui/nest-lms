import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { MongoExceptionFilter } from './common/filter/mongo-exception.filter.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new MongoExceptionFilter());

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
