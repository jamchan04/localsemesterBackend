import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Semester } from '../../entities/semester.entity';
import { SemestersService } from './semesters.service';

@Controller('semester')
export class SemestersController {
  constructor(private readonly semestersService: SemestersService) {}

  @Get()
  findMany(@Query('userId') userId?: string): Promise<Semester[]> {
    return this.semestersService.findAll({ userId });
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Semester> {
    return this.semestersService.findOne(Number(id));
  }

  @Post()
  create(@Body() body: Semester): Promise<Semester> {
    return this.semestersService.create(body);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: Partial<Semester>,
  ): Promise<Semester> {
    return this.semestersService.update(Number(id), body);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.semestersService.remove(Number(id));
  }
}
