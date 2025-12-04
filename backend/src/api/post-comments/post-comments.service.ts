import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, type FindManyOptions } from 'typeorm';
import { PostComment } from '../../entities/post-comment.entity';

export interface CreatePostCommentDto {
  userId: number;
  username?: string;
  postId: number;
  article: string;
  createAt?: string | Date;
}

@Injectable()
export class PostCommentsService {
  constructor(
    @InjectRepository(PostComment)
    private readonly postCommentRepository: Repository<PostComment>,
  ) {}

  async findAll(filters: {
    postId?: string;
    limit?: string;
    offset?: string;
  }): Promise<PostComment[]> {
    const options: FindManyOptions<PostComment> = {
      order: { createAt: 'ASC' },
    };

    if (filters.postId) {
      const postId = Number(filters.postId);
      if (Number.isNaN(postId)) {
        return [];
      }
      options.where = { postId };
    }

    const take = this.parsePositiveNumber(filters.limit);
    const skip = this.parsePositiveNumber(filters.offset);
    if (typeof take === 'number') {
      options.take = take;
    }
    if (typeof skip === 'number') {
      options.skip = skip;
    }

    return this.postCommentRepository.find(options);
  }

  async create(dto: CreatePostCommentDto): Promise<PostComment> {
    if (!dto.userId || !dto.postId || !dto.article) {
      throw new BadRequestException('userId, postId, and article are required');
    }

    const comment = this.postCommentRepository.create({
      ...dto,
      createAt: dto.createAt ? new Date(dto.createAt) : new Date(),
    });

    return this.postCommentRepository.save(comment);
  }

  async remove(id: number): Promise<void> {
    await this.postCommentRepository.delete(id);
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
