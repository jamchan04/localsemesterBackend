import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SemesterComment } from '../../entities/semester-comment.entity';

export interface CreateSemesterCommentDto {
  userId: number;
  username?: string;
  semesterId: number;
  article: string;
  createAt?: string | Date;
}

@Injectable()
export class SemesterCommentsService {
  constructor(
    @InjectRepository(SemesterComment)
    private readonly semesterCommentRepository: Repository<SemesterComment>,
  ) {}

  async findAll(filters: { semesterId?: string }): Promise<SemesterComment[]> {
    if (!filters.semesterId) {
      return this.semesterCommentRepository.find();
    }

    const semesterId = Number(filters.semesterId);
    if (Number.isNaN(semesterId)) {
      return [];
    }

    return this.semesterCommentRepository.find({
      where: { semesterId },
      order: { createAt: 'ASC' },
    });
  }

  async create(dto: CreateSemesterCommentDto): Promise<SemesterComment> {
    if (!dto.userId || !dto.semesterId || !dto.article) {
      throw new BadRequestException(
        'userId, semesterId, and article are required',
      );
    }

    const comment = this.semesterCommentRepository.create({
      ...dto,
      createAt: dto.createAt ? new Date(dto.createAt) : new Date(),
    });

    return this.semesterCommentRepository.save(comment);
  }

  async remove(id: number): Promise<void> {
    await this.semesterCommentRepository.delete(id);
  }
}
