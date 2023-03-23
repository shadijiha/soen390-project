import { Controller } from '@nestjs/common/decorators/core/controller.decorator'
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator'
import { Post } from '@nestjs/common/decorators/http/request-mapping.decorator'
import { Body, UploadedFiles } from '@nestjs/common/decorators/http/route-params.decorator'
import { ApiBearerAuth } from '@nestjs/swagger/dist/decorators/api-bearer.decorator'
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator'
import { PusherService } from '../../util/pusher/pusher.service'
import { JwtAuthGuard } from '../../auth/jwt-auth.guard'
import { AuthUser, BearerPayload } from '../../util/util'
import { PostsService } from './posts.service'
import { FileValidationPipe } from 'src/util/fileValidationPipe'

@Controller('posts')
@ApiTags('Posts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class PostsController {
    constructor(private readonly pusherService: PusherService, private postsService: PostsService) {}
    
    @Post()
    async createPost(
        @AuthUser() user: BearerPayload,
        @Body() createPostDto: CreatePostDto,
        @UploadedFiles(FileValidationPipe) files: { profilePic?: Express.Multer.File, coverPic?: Express.Multer.File }
    ) {
        const post = await this.postsService.createPost(user, createPostDto)
        // this.pusherService.trigger('posts', 'created', post)
        return post
    }
}

export interface CreatePostDto {
    content: string;
    image?: string;
}