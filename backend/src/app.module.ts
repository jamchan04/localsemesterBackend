import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './module/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const host = configService.get<string>('DB_HOST') || 'localhost';
        const port = parseInt(configService.get<string>('DB_PORT') || '3306', 10);
        const username = configService.get<string>('DB_USERNAME') || configService.get<string>('DB_USER');
        const password = configService.get<string>('DB_PASSWORD') || configService.get<string>('DB_PASS');
        const database = configService.get<string>('DB_DATABASE') || configService.get<string>('DB_NAME');
        console.log('DB_HOST:', host);
        console.log('DB_USERNAME:', username);
        console.log('DB_PASSWORD:', password);
        return {
          type: 'mysql',
          host,
          port,
          username,
          password,
          database,
          synchronize: configService.get<string>('DB_SYNCHRONIZE') === 'true',
          logging: configService.get<string>('DB_LOGGING') === 'true',
          autoLoadEntities: true,
        };
      },
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
