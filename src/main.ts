import { LoggerService } from './logger/logger.service';
import { HttpExceptionFilter } from './exFilters/HttpExceptionFilter';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { parse } from 'yaml';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { exit } from 'process';

dotenv.config();

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  const source = await readFile(
    join(dirname(__dirname), 'doc/api.yaml'),
    'utf8',
  );
  const document = parse(source);
  SwaggerModule.setup('doc', app, document);

  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('Home music library service')
    .setVersion('1.0')
    .build();
  const documentApi = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentApi);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT);

  const logger = app.get(LoggerService);

  process.on('uncaughtException', (err) => {
    logger.error(`Uncaught Exception: ${err}`);
    exit(1);
  });

  process.on('unhandledRejection', (reason, promiseT) => {
    logger.error(`Unhandle at promise: ${promiseT}, Reason: ${reason}`);
  });
}
bootstrap();
