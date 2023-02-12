import { type PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common'
import { cpSync } from 'fs'

@Injectable()
export class FileValidationPipe implements PipeTransform {
  async transform (files: { profile_pic?: Express.Multer.File, cover_pic?: Express.Multer.File }) {
    const validTypes = ['image/']
    const maxSize = 5 * 1024 * 1024 // 5 MB

    const profile_pic: Express.Multer.File = files?.profile_pic != null ? files.profile_pic[0] : null
    const cover_pic: Express.Multer.File = files?.cover_pic != null ? files.cover_pic[0] : null

    const images: Express.Multer.File[] = []
    if (profile_pic != null) { images.push(profile_pic) }

    if (cover_pic != null) { images.push(cover_pic) }

    console.log(images)

    for (const image of images) {
      if (!image.mimetype.startsWith('image/')) {
        throw new BadRequestException(`Invalid file type: ${image.mimetype}`)
      }

      if (image.size > maxSize) {
        throw new BadRequestException(`File size too large: ${image.size}`)
      }
    }

    return files
  }
}
