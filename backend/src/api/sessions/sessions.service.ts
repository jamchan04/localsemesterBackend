import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from '../../entities/session.entity';

export interface CreateSessionDto {
  sessionId: number;
  uid: number;
}

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
  ) {}

  async findAll(filters: {
    sessionId?: string;
    uid?: string;
  }): Promise<Session[]> {
    const where: Partial<Session>[] = [];

    if (filters.sessionId) {
      const sessionId = Number(filters.sessionId);
      if (!Number.isNaN(sessionId)) {
        where.push({ sessionId });
      }
    }

    if (filters.uid) {
      const uid = Number(filters.uid);
      if (!Number.isNaN(uid)) {
        where.push({ uid });
      }
    }

    if (where.length === 0) {
      return this.sessionRepository.find();
    }

    return this.sessionRepository.find({ where });
  }

  async create(dto: CreateSessionDto): Promise<Session> {
    if (
      dto.sessionId === undefined ||
      dto.sessionId === null ||
      dto.uid === undefined ||
      dto.uid === null
    ) {
      throw new BadRequestException('sessionId and uid are required');
    }

    const session = this.sessionRepository.create(dto);
    return this.sessionRepository.save(session);
  }

  async remove(id: number): Promise<void> {
    const existing = await this.sessionRepository.findOne({ where: { id } });
    if (!existing) {
      throw new NotFoundException('Session not found');
    }
    await this.sessionRepository.delete(id);
  }
}
