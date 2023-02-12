import { type PipeTransform, Injectable, BadRequestException } from '@nestjs/common'

@Injectable()
export class FileValidationPipe implements PipeTransform {
  async transform (files: { profilePic?: Express.Multer.File, coverPic?: Express.Multer.File }): Promise<{ profilePic?: Express.Multer.File | undefined, coverPic?: Express.Multer.File | undefined }> {
    const maxSize = 5 * 1024 * 1024 // 5 MB

    const profilePic: Express.Multer.File = files?.profilePic != null ? files.profilePic[0] : null
    const coverPic: Express.Multer.File = files?.coverPic != null ? files.coverPic[0] : null

    const images: Express.Multer.File[] = []
    if (profilePic != null) { images.push(profilePic) }

    if (coverPic != null) { images.push(coverPic) }

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
