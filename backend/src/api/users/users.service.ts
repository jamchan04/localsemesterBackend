import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';

export interface CreateUserDto {
  username?: string;
  userId: string;
  email?: string;
  password: string;
  state?: number;
  createAt?: string | Date;
  photoId?: number;
  message?: string;
  profilePhoto?: string;
}

export type UpdateUserDto = Partial<CreateUserDto>;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findAll(filters: {
    id?: string;
    userId?: string;
    email?: string;
  }): Promise<User[]> {
    const where: Partial<User>[] = [];

    if (filters.id) {
      const id = Number(filters.id);
      if (!Number.isNaN(id)) {
        where.push({ id });
      }
    }
    if (filters.userId) {
      where.push({ userId: filters.userId });
    }
    if (filters.email) {
      where.push({ email: filters.email });
    }

    if (where.length === 0) {
      return this.userRepository.find();
    }

    return this.userRepository.find({ where });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async create(dto: CreateUserDto): Promise<User> {
    if (!dto.userId || !dto.password) {
      throw new BadRequestException('userId and password are required');
    }

    const exists = await this.userRepository.findOne({
      where: [{ userId: dto.userId }, { email: dto.email }],
    });
    if (exists) {
      throw new ConflictException('User already exists');
    }

    const user = this.userRepository.create({
      username: dto.username,
      userId: dto.userId,
      email: dto.email,
      password: dto.password,
      state: dto.state ?? 1,
      createAt: dto.createAt ? new Date(dto.createAt) : new Date(),
      photoId: dto.photoId,
      message: dto.message,
      profilePhoto: dto.profilePhoto,
    });

    return this.userRepository.save(user);
  }

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    let patched = { ...dto };
    if (dto.password) {
      patched = {
        ...patched,
        password: await bcrypt.hash(dto.password, 10),
      };
    }

    this.userRepository.merge(user, {
      ...patched,
      createAt: dto.createAt ? new Date(dto.createAt) : user.createAt,
    });

    return this.userRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
