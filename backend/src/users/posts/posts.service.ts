import { Injectable } from '@nestjs/common';
import { BearerPayload } from 'src/util/util';
import { CreatePostDto } from './posts.controller';

@Injectable()
export class PostsService {
    createPost(user: BearerPayload, createPostDto: CreatePostDto) {
        throw new Error('Method not implemented.');
    }
}
