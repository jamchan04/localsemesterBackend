import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SemesterCommentsController } from '../api/semester-comments/semester-comments.controller';
import { SemesterCommentsService } from '../api/semester-comments/semester-comments.service';
import { SemesterComment } from '../entities/semester-comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SemesterComment])],
  controllers: [SemesterCommentsController],
  providers: [SemesterCommentsService],
})
export class SemesterCommentsModule {}
