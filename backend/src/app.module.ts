import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './module/auth.module';
import { MembersModule } from './module/members.module';
import { PhotosModule } from './module/photos.module';
import { PostCommentsModule } from './module/post-comments.module';
import { PostsModule } from './module/posts.module';
import { SemesterCommentsModule } from './module/semester-comments.module';
import { SemestersModule } from './module/semesters.module';
import { SessionsModule } from './module/sessions.module';
import { UploadModule } from './module/upload.module';
import { UsersModule } from './module/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
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
          charset: 'utf8mb4',
          extra: {
            charset: 'utf8mb4_unicode_ci',
            timezone: 'local',
            dateStrings: true,
          },
          synchronize: configService.get<string>('DB_SYNCHRONIZE') === 'true',
          logging: configService.get<string>('DB_LOGGING') === 'true',
          autoLoadEntities: true,
        };
      },
    }),
    UsersModule,
    SessionsModule,
    PhotosModule,
    PostsModule,
    PostCommentsModule,
    SemestersModule,
    SemesterCommentsModule,
    MembersModule,
    UploadModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
