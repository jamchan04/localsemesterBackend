import * as dotenv from 'dotenv';
import * as path from 'path';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { json, urlencoded } from 'express';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

// 앱 시작 전 .env 로드 (최우선)
const envPath = path.resolve(process.cwd(), '.env');
console.log(`[MAIN] Loading .env from: ${envPath}`);
dotenv.config({ path: envPath, override: true });
console.log(`[MAIN] DB_PASSWORD: ${process.env.DB_PASSWORD}`);

async function bootstrap() {
  // Disable the default body parser so we don't double-parse and hang JSON requests.
  const app = await NestFactory.create(AppModule, { bodyParser: false });
  // allow bigger payloads for base64 images
  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ extended: true, limit: '10mb' }));
  app.enableCors({ origin: true, credentials: true });
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: false, // current DTOs/entities lack validation decorators; allow fields through
      forbidUnknownValues: false, // allow plain objects without class-validator schemas (e.g., current DTOs)
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
