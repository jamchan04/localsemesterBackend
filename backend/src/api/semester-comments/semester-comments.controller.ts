import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { SemesterComment } from '../../entities/semester-comment.entity';
import { SemesterCommentsService } from './semester-comments.service';
import type { CreateSemesterCommentDto } from './semester-comments.service';

@Controller('semesterComment')
export class SemesterCommentsController {
  constructor(
    private readonly semesterCommentsService: SemesterCommentsService,
  ) {}

  @Get()
  findMany(
    @Query('semesterId') semesterId?: string,
  ): Promise<SemesterComment[]> {
    return this.semesterCommentsService.findAll({ semesterId });
  }

  @Post()
  create(@Body() body: CreateSemesterCommentDto): Promise<SemesterComment> {
    return this.semesterCommentsService.create(body);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.semesterCommentsService.remove(Number(id));
  }
}
