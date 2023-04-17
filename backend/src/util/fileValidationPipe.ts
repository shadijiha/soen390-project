import { type PipeTransform, Injectable, BadRequestException } from '@nestjs/common'

@Injectable()
export class ProfileImagesFileValidationPipe implements PipeTransform {
  async transform (files: {
    profilePic?: Express.Multer.File
    coverPic?: Express.Multer.File
  }): Promise<{ profilePic?: Express.Multer.File | undefined, coverPic?: Express.Multer.File | undefined }> {
    const maxSize = 5 * 1024 * 1024 // 5 MB

    const profilePic: Express.Multer.File = files?.profilePic != null ? files.profilePic[0] : null
    const coverPic: Express.Multer.File = files?.coverPic != null ? files.coverPic[0] : null

    const images: Express.Multer.File[] = []
    if (profilePic != null) {
      images.push(profilePic)
    }

    if (coverPic != null) {
      images.push(coverPic)
    }

   

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

export class ApplicationFileValidationPipe implements PipeTransform {
  async transform (files: {
    cv?: Express.Multer.File
    coverLetter?: Express.Multer.File
  }): Promise<{ cv?: Express.Multer.File | undefined, coverLetter?: Express.Multer.File | undefined }> {
    const maxSize = 5 * 1024 * 1024 // 5 MB

    const cv: Express.Multer.File = files?.cv != null ? files.cv[0] : null
    const coverLetter: Express.Multer.File = files?.coverLetter != null ? files.coverLetter[0] : null

    const pdfs: Express.Multer.File[] = []
    if (cv != null) {
      pdfs.push(cv)
    }

    if (coverLetter != null) {
      pdfs.push(coverLetter)
    }



    for (const pdf of pdfs) {
      if (!pdf.mimetype.endsWith('/pdf')) {
        throw new BadRequestException(`Invalid file type: ${pdf.mimetype}`)
      }

      if (pdf.size > maxSize) {
        throw new BadRequestException(`File size too large: ${pdf.size}`)
      }
    }

    return files
  }
}

export class PostImageValidationPipe implements PipeTransform {
  async transform (files: {
    image?: Express.Multer.File
  }): Promise<{ image?: Express.Multer.File | undefined }> {
    const maxSize = 5 * 1024 * 1024 // 5 MB
    const profilePic: Express.Multer.File = files?.image != null ? files.image[0] : null
    const images: Express.Multer.File[] = []

    if (profilePic != null) images.push(profilePic)

    for (const image of images) {
      if (!image.mimetype.startsWith('image/')) throw new BadRequestException(`Invalid file type: ${image.mimetype}`)
      if (image.size > maxSize) throw new BadRequestException(`File size too large: ${image.size}`)
    }

    return files
  }
}
