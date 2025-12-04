import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, type FindManyOptions } from 'typeorm';
import { Post } from '../../entities/post.entity';

interface CreatePostDto {
  title?: string;
  article?: string;
  createAt?: string | Date;
  userId?: number;
  username?: string;
  photoId?: number;
  src?: unknown;
}

type UpdatePostDto = Partial<CreatePostDto>;

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
  ) {}

  async findAll(filters: {
    userId?: string;
    limit?: string;
    offset?: string;
  }): Promise<Post[]> {
    const options: FindManyOptions<Post> = {
      order: { createAt: 'DESC' },
    };

    if (filters.userId) {
      const userId = Number(filters.userId);
      if (!Number.isNaN(userId)) {
        options.where = { userId };
      }
    }

    const take = this.parsePositiveNumber(filters.limit);
    const skip = this.parsePositiveNumber(filters.offset);
    if (typeof take === 'number') {
      options.take = take;
    }
    if (typeof skip === 'number') {
      options.skip = skip;
    }

    return this.postRepository.find(options);
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  async create(dto: CreatePostDto): Promise<Post> {
    if (!dto.title || !dto.article || !dto.userId) {
      throw new BadRequestException('title, article, and userId are required');
    }

    const post = this.postRepository.create({
      ...dto,
      createAt: dto.createAt ? new Date(dto.createAt) : new Date(),
    });
    return this.postRepository.save(post);
  }

  async update(id: number, dto: UpdatePostDto): Promise<Post> {
    const post = await this.findOne(id);
    this.postRepository.merge(post, {
      ...dto,
      createAt: dto.createAt ? new Date(dto.createAt) : post.createAt,
    });
    return this.postRepository.save(post);
  }

  async remove(id: number): Promise<void> {
    await this.postRepository.delete(id);
  }

  private parsePositiveNumber(value?: string): number | undefined {
    if (value === undefined) {
      return undefined;
    }
    const parsed = Number(value);
    if (!Number.isFinite(parsed) || parsed < 0) {
      return undefined;
    }
    return parsed;
  }
}
