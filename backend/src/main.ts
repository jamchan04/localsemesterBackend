import * as dotenv from 'dotenv';
import * as path from 'path';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// 앱 시작 전 .env 로드 (최우선)
const envPath = path.resolve(process.cwd(), '.env');
console.log(`[MAIN] Loading .env from: ${envPath}`);
dotenv.config({ path: envPath, override: true });
console.log(`[MAIN] DB_PASSWORD: ${process.env.DB_PASSWORD}`);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
