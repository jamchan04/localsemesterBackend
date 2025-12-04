import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import type { Express } from 'express';

const UPLOAD_DIR = path.join(__dirname, '..', '..', '..', 'uploads');

function ensureUploadDir() {
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }
}

@Controller('upload')
export class UploadController {
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          ensureUploadDir();
          cb(null, UPLOAD_DIR);
        },
        filename: (req, file, cb) => {
          const ext = path.extname(file.originalname);
          const base = path.basename(file.originalname, ext);
          const safeBase = base.replace(/[^a-zA-Z0-9_-]/g, '');
          cb(null, `${safeBase || 'upload'}-${Date.now()}${ext}`);
        },
      }),
    }),
  )
  upload(@UploadedFile() file?: any) {
    if (!file) {
      return { success: false, message: 'No file uploaded' };
    }
    // Public URL served by ServeStaticModule (/uploads)
    const url = `/uploads/${file.filename}`;
    return { success: true, filename: file.filename, url };
  }
}
