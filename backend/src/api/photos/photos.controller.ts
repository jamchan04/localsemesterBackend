import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { Photo } from '../../entities/photo.entity';
import { PhotosService } from './photos.service';

@Controller('photo')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Get()
  findMany(@Query('id') id?: string): Promise<Photo[]> {
    return this.photosService.findAll({ id });
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Photo> {
    return this.photosService.findOne(Number(id));
  }

  @Post()
  create(@Body() body: Photo): Promise<Photo> {
    return this.photosService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: Partial<Photo>): Promise<Photo> {
    return this.photosService.update(Number(id), body);
  }
}
