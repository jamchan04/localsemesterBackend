import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, type JwtModuleOptions } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from '../api/auth/auth.controller';
import { AuthService } from '../api/auth/auth.service';
import { AuthGuard } from '../guards/auth.guard';
import { User } from '../entities/user.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService): JwtModuleOptions => {
        const expiresInConfig = Number(config.get<string>('JWT_EXPIRES_IN'));
        const expiresIn = Number.isFinite(expiresInConfig)
          ? expiresInConfig
          : 3600; // seconds
        return {
          secret: config.get<string>('JWT_SECRET') || 'dev-secret',
          signOptions: {
            expiresIn,
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [AuthGuard],
})
export class AuthModule {}
