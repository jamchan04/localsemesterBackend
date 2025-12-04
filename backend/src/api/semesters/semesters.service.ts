import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Semester } from '../../entities/semester.entity';

interface CreateSemesterDto {
  title?: string;
  article?: string;
  createAt?: string | Date;
  userId?: number;
  username?: string;
  photoId?: number;
  src?: unknown;
}

type UpdateSemesterDto = Partial<CreateSemesterDto>;

@Injectable()
export class SemestersService {
  constructor(
    @InjectRepository(Semester)
    private readonly semesterRepository: Repository<Semester>,
  ) {}

  async findAll(filters: { userId?: string }): Promise<Semester[]> {
    const options: Parameters<typeof this.semesterRepository.find>[0] = {
      order: { createAt: 'DESC' },
    };

    if (filters.userId) {
      const userId = Number(filters.userId);
      if (!Number.isNaN(userId)) {
        options.where = { userId };
      }
    }

    return this.semesterRepository.find(options);
  }

  async findOne(id: number): Promise<Semester> {
    const semester = await this.semesterRepository.findOne({ where: { id } });
    if (!semester) {
      throw new NotFoundException('Semester not found');
    }
    return semester;
  }

  async create(dto: CreateSemesterDto): Promise<Semester> {
    if (!dto.title || !dto.article || !dto.userId) {
      throw new BadRequestException('title, article, and userId are required');
    }

    const semester = this.semesterRepository.create({
      ...dto,
      createAt: dto.createAt ? new Date(dto.createAt) : new Date(),
    });
    return this.semesterRepository.save(semester);
  }

  async update(id: number, dto: UpdateSemesterDto): Promise<Semester> {
    const semester = await this.findOne(id);
    this.semesterRepository.merge(semester, {
      ...dto,
      createAt: dto.createAt ? new Date(dto.createAt) : semester.createAt,
    });
    return this.semesterRepository.save(semester);
  }

  async remove(id: number): Promise<void> {
    await this.semesterRepository.delete(id);
  }
}
