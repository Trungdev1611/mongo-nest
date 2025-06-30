import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, Types } from 'mongoose';
import { Comment, CommentDocument } from 'src/schemas/Comment.schema';
import { Post, PostDocument, PostTypeLean } from 'src/schemas/Post.schema';
import { CreatePostCommentDTO } from './dto/createPostComment.dto';
import { UpdatePostDto } from './dto/updatePost.dto';

@Injectable()
export class PostRepository {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>
  ) {}

  async createPost(data: Partial<Post>, transaction?: ClientSession) {
    //không dùng transaction
    // return this.postModel.create(data)

    //dùng transaction
    const post =  new this.postModel(data)
    return await post.save({session: transaction})//muốn dùng transaction trong mongo phải truyền vào từng promise
  }

  async createComment(data: CreatePostCommentDTO | CreatePostCommentDTO[], transaction?: ClientSession) {
    if(Array.isArray(data)) {
      return await this.commentModel.insertMany(data, {session:transaction }) //dùng với transaction {session:transaction }
    }
    else {
      const comment = new this.commentModel(data)
      return await comment.save({session: transaction}) //dùng với transaction {session:transaction }
    }

 
  }

  async findAllPost(): Promise<PostTypeLean[]>{
    const result =  await this.postModel.find().lean().exec()
    return result as PostTypeLean[]
  }
  
  async findAllPostAndComments(filter: Record<string, any>) {
    return this.postModel.aggregate([
      {$match: filter},
      {$lookup: {
        from: 'comments',
        localField: '_id',
        foreignField: 'post',
        as: 'comments'

      }}
    ])
  }

  async findPostByIdAndItsComments(id: string, filter: Record<string, any>) {
    return this.postModel.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(id),
           ...filter
        },
    },
    {$lookup: {
      from: 'comments',
      localField: '_id',
      foreignField: 'post',
      as: 'comments'
    }}
  ])
  }

  async deletePostAndItsComments(idPost: string) {
    const postDeleted = await this.postModel.findByIdAndDelete(idPost)
    await this.commentModel.deleteMany({post: idPost})
    return postDeleted

  }

  async updatePost(idPost: string, dataUpdate: UpdatePostDto) {
    const updatesRemoveFalsy = Object.entries(dataUpdate).reduce((acc, [key, value]) => {
      if (value !== undefined) acc[key] = value;
      return acc;
    }, {} as Record<string, any>);
     
     await this.postModel.updateOne({_id: idPost}, {$set: updatesRemoveFalsy})
     return dataUpdate

  }
}