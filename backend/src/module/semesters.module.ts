import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SemestersController } from '../api/semesters/semesters.controller';
import { SemestersService } from '../api/semesters/semesters.service';
import { Semester } from '../entities/semester.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Semester])],
  controllers: [SemestersController],
  providers: [SemestersService],
})
export class SemestersModule {}
