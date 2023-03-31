import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "../../models/post.entity";
import { BearerPayload } from "../../util/util";
import { In, Repository } from "typeorm";
import { ConnectionsService } from "../connections/connections.service";
import { Posts } from "./posts.types";

// Service that handles all the logic for posts
@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private connectionService: ConnectionsService
  ) {}

  createPost(authedUser: BearerPayload, post: Posts.CreatePostDto, files) {
    console.log("CONTENT IS: " + post.content);
    //add post to user
    const _post = new Post();
    _post.content = post.content;
    _post.user = authedUser.id as any; //this is the user that is logged in

    console.log("ID IS::" + authedUser.id);
    if (files?.image != null) {
      const buff = files.image[0].buffer;
      const base64data = buff.toString("base64");
      _post.image = base64data;
    }

    this.postRepository.save(_post).then((post) => {
      return "Post saved";
    });
  }

  async deletePost(userInfo: BearerPayload, id: number) {
    const post = await this.postRepository.findOne({
      where: { id: id, user: { id: userInfo.id } },
    });
    if (post == null) throw new Error("Post does not exist"); // if post does not exist, throw error

    await this.postRepository.delete({ id: id }).then((post) => {
      return "Post deleted";
    });
  }

  async getFeed(userInfo: BearerPayload) {
    // function that returns all the posts of the user that they are connected to
    const connections = await this.connectionService.getAcceptedConnections(userInfo.id);
    const ids: number[] = connections.map((connection) => connection.user.id);
    ids.push(userInfo.id);
    console.log("IDS ARE: ", ids);
    
    const posts = await this.postRepository.find(
        {where: {user: {id: In(ids)}}, order: {created_at: "DESC"}, relations: ["user"]}
    );
    return posts;
    }
}
