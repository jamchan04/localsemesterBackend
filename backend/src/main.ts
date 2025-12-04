import * as dotenv from 'dotenv';
import * as path from 'path';
import { NestFactory } from '@nestjs/core';
import { json, urlencoded } from 'express';
import { AppModule } from './app.module';

// 앱 시작 전 .env 로드 (최우선)
const envPath = path.resolve(process.cwd(), '.env');
console.log(`[MAIN] Loading .env from: ${envPath}`);
dotenv.config({ path: envPath, override: true });
console.log(`[MAIN] DB_PASSWORD: ${process.env.DB_PASSWORD}`);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // allow bigger payloads for base64 images
  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ extended: true, limit: '10mb' }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
