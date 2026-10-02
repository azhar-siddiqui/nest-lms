import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule, ObserveInstrument } from './app.module.js';
import { MongoExceptionFilter } from './common/filter/mongo-exception.filter.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });

  // 1. Configure the base document
  const config = new DocumentBuilder()
    .setTitle('My Awesome API')
    .setDescription('The API description for my project')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description:
          'Paste the access_token value only. Swagger adds the Bearer prefix.',
      },
      'bearer',
    )
    .build();

  // 2. Wrap document creation in a factory function (lazy generation)
  const documentFactory = () => SwaggerModule.createDocument(app, config);

  // 3. Mount Swagger UI on the '/api/docs' route
  SwaggerModule.setup('api/docs', app, documentFactory, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new MongoExceptionFilter());

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
