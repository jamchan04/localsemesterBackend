import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { promises as fs } from 'fs';
import * as path from 'path';
import { Repository } from 'typeorm';
import { Photo } from '../../entities/photo.entity';

interface CreatePhotoDto {
  src: string;
}

type UpdatePhotoDto = Partial<CreatePhotoDto>;

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(Photo) private readonly photoRepository: Repository<Photo>,
  ) {}

  async findAll(filters: { id?: string }): Promise<Photo[]> {
    if (!filters.id) {
      return this.photoRepository.find();
    }

    const id = Number(filters.id);
    if (Number.isNaN(id)) {
      return [];
    }

    return this.photoRepository.find({ where: { id } });
  }

  async findOne(id: number): Promise<Photo> {
    const photo = await this.photoRepository.findOne({ where: { id } });
    if (!photo) {
      throw new NotFoundException('Photo not found');
    }
    return photo;
  }

  async create(dto: CreatePhotoDto): Promise<Photo> {
    if (!dto.src) {
      throw new BadRequestException('src is required');
    }

    const srcPath = await this.persistSrc(dto.src);
    const photo = this.photoRepository.create({ src: srcPath });
    return this.photoRepository.save(photo);
  }

  async update(id: number, dto: UpdatePhotoDto): Promise<Photo> {
    const photo = await this.findOne(id);

    const patched: UpdatePhotoDto = { ...dto };
    if (dto.src) {
      patched.src = await this.persistSrc(dto.src);
    }

    this.photoRepository.merge(photo, patched);
    return this.photoRepository.save(photo);
  }

  /**
   * If src is a data URL (base64), save to /uploads and return the served path.
   * Otherwise, return as-is.
   */
  private async persistSrc(src: string): Promise<string> {
    const isDataUrl = src.startsWith('data:image');
    if (!isDataUrl) {
      return src;
    }

    const uploadsDir = path.join(process.cwd(), 'uploads');
    await fs.mkdir(uploadsDir, { recursive: true });

    const matches = src.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);
    const mime = matches?.[1] || 'image/png';
    const base64Data = matches?.[2] || src.replace(/^data:image\/\w+;base64,/, '');
    const extension = mime.split('/')[1] || 'png';
    const filename = `photo-${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`;
    const filePath = path.join(uploadsDir, filename);

    await fs.writeFile(filePath, Buffer.from(base64Data, 'base64'));
    // Served via ServeStaticModule at /uploads
    return `/uploads/${filename}`;
  }
}
