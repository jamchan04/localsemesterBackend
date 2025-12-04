import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { PostComment } from '../../entities/post-comment.entity';
import { PostCommentsService } from './post-comments.service';
import type { CreatePostCommentDto } from './post-comments.service';

@Controller('postComment')
export class PostCommentsController {
  constructor(private readonly postCommentsService: PostCommentsService) {}

  @Get()
  findMany(
    @Query('postId') postId?: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ): Promise<PostComment[]> {
    return this.postCommentsService.findAll({ postId, limit, offset });
  }

  @Post()
  create(@Body() body: CreatePostCommentDto): Promise<PostComment> {
    return this.postCommentsService.create(body);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.postCommentsService.remove(Number(id));
  }
}
