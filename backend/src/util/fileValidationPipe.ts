import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class FileValidationPipe implements PipeTransform {

  async transform(files: any) {
    const validTypes = ['image/'];
    const maxSize = 5 * 1024 * 1024; // 5 MB

    files = Object.entries(files);
    
    for (const [key, value] of files) {
      console.log(value) 
      if (!validTypes.includes(value.mimetype)) {
        throw new BadRequestException(`Invalid file type: ${value.mimetype}`);
      }

      if (value.size > maxSize) {
        throw new BadRequestException(`File size too large: ${value.size}`);
      }
    }

    return files;
  }
}