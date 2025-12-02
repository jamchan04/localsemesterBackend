import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';

interface RegisterDto {
  username?: string;
  userId: string;
  email: string;
  password: string;
  state?: number;
}

interface LoginDto {
  userId: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    if (!dto.userId || !dto.email || !dto.password) {
      throw new BadRequestException('userId, email, password are required');
    }

    const exists = await this.userRepository.findOne({
      where: [{ userId: dto.userId }, { email: dto.email }],
    });
    if (exists) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = this.userRepository.create({
      username: dto.username,
      userId: dto.userId,
      email: dto.email,
      password: hashedPassword,
      state: dto.state ?? 1,
      createAt: new Date(),
    });

    const saved = await this.userRepository.save(user);
    const token = this.createAccessToken(saved);

    return {
      user: this.stripPassword(saved),
      accessToken: token,
    };
  }

  async login(dto: LoginDto) {
    if (!dto.userId || !dto.password) {
      throw new BadRequestException('userId and password are required');
    }

    const user = await this.userRepository.findOne({
      where: [{ userId: dto.userId }, { email: dto.userId }],
    });

    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.createAccessToken(user);

    return {
      user: this.stripPassword(user),
      accessToken: token,
    };
  }

  private createAccessToken(user: User) {
    const payload = {
      sub: user.id,
      userId: user.userId,
      email: user.email,
      username: user.username,
    };

    const expiresInConfig = Number(
      this.configService.get<string>('JWT_EXPIRES_IN'),
    );
    const expiresIn = Number.isFinite(expiresInConfig) ? expiresInConfig : 3600;
    const secret = this.configService.get<string>('JWT_SECRET') || 'dev-secret';

    return this.jwtService.sign(payload, {
      secret,
      expiresIn,
    });
  }

  private stripPassword(user: User) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = user;
    return rest;
  }
}
