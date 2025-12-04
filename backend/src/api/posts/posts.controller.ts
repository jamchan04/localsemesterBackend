import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post as PostMethod,
  Query,
} from '@nestjs/common';
import { Post } from '../../entities/post.entity';
import { PostsService } from './posts.service';

@Controller('post')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findMany(
    @Query('userId') userId?: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ): Promise<Post[]> {
    return this.postsService.findAll({ userId, limit, offset });
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Post> {
    return this.postsService.findOne(Number(id));
  }

  @PostMethod()
  create(@Body() body: Post): Promise<Post> {
    return this.postsService.create(body);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: Partial<Post>,
  ): Promise<Post> {
    return this.postsService.update(Number(id), body);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.postsService.remove(Number(id));
  }
}
