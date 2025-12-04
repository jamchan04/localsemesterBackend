import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostCommentsController } from '../api/post-comments/post-comments.controller';
import { PostCommentsService } from '../api/post-comments/post-comments.service';
import { PostComment } from '../entities/post-comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostComment])],
  controllers: [PostCommentsController],
  providers: [PostCommentsService],
})
export class PostCommentsModule {}
