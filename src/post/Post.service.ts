import { Injectable } from '@nestjs/common';
import { PostCreateDTO } from './dto/createPostComment.dto';
import { PostRepository } from './Post.repository';
import { Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';
import { PostCommentDTOFilter } from './dto/postComment.dto';
import { UpdatePostDto } from './dto/updatePost.dto';


@Injectable()
export class PostService {
    constructor(private postRepository: PostRepository,
        @InjectConnection()    private readonly connection: Connection

    ) {

    }
 async  create(createDataDto: PostCreateDTO) {
    const {comments, ...postData} = createDataDto

    const session = await this.connection.startSession();
    session.startTransaction();

    try {
        const postSave = await this.postRepository.createPost(postData, session)
        const postId = postSave._id
        if (comments?.length) {
      
            const commentData = comments.map((c) => ({
              content: c.content,
              post: postId,
            }));
      
            await this.postRepository.createComment(commentData, session);
          }

          await session.commitTransaction();
          session.endSession();
    
        return postSave
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }

   
  }

  findAll() {
    return this.postRepository.findAllPost()
  }

  findAllPostAndComments(query: PostCommentDTOFilter) {
    const filter :Record<string, any>= {}
    if(query.search) {
      filter.title = {$regex: query.search, $options: 'i'}
    }
    return this.postRepository.findAllPostAndComments(filter)
  }

  findOne(id: string, query: PostCommentDTOFilter) {
    return this.postRepository.findPostByIdAndItsComments(id, query)
  }

  update(id: string, updateDto: UpdatePostDto) {
    return this.postRepository.updatePost(id, updateDto)
  }

 async deletePost(id: string) {
    return await this.postRepository.deletePostAndItsComments(id)
  }
}
