import { Controller } from '@nestjs/common/decorators/core/controller.decorator'
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator'
import { Delete, Post } from '@nestjs/common/decorators/http/request-mapping.decorator'
import { Body, Param, UploadedFiles } from '@nestjs/common/decorators/http/route-params.decorator'
import { ApiBearerAuth } from '@nestjs/swagger/dist/decorators/api-bearer.decorator'
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator'
import { PusherService } from '../../util/pusher/pusher.service'
import { JwtAuthGuard } from '../../auth/jwt-auth.guard'
import { AuthUser, BearerPayload } from '../../util/util'
import { PostsService } from './posts.service'
import { PostImageValidationPipe } from 'src/util/fileValidationPipe'
import { ApiConsumes, ApiProperty } from '@nestjs/swagger'
import { Posts } from './posts.types'
import { HttpException, UseInterceptors } from '@nestjs/common'
import { FileFieldsInterceptor } from '@nestjs/platform-express'

// APIs to create, update, delete, and get posts
@Controller('posts')
@ApiTags('Posts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class PostsController {
    constructor(private readonly pusherService: PusherService, private postsService: PostsService) {}
    
    @Post()
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(
        FileFieldsInterceptor([
          { name: 'image', maxCount: 1 },
        ])
      )
    async createPost(
        @AuthUser() userInfo: BearerPayload,
        @Body() post: Posts.CreatePostDto,
        @UploadedFiles(PostImageValidationPipe) files: { image?: Express.Multer.File}
    ) {
        try{
            await this.postsService.createPost(userInfo, post, files)
        }catch(e){
            throw new HttpException((e as Error).message, 400)
        } 
    }

    @Delete(':id')
    async deletePost(
        @AuthUser() userInfo: BearerPayload,
        @Param('id') id: number
    ) {
        try{
            await this.postsService.deletePost(userInfo, id)
        }catch(e){
            throw new HttpException((e as Error).message, 400)
        }
    }
}
