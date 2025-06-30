import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostController } from './Post.controller';
import { PostService } from './Post.service';
import { PostRepository } from './Post.repository';
import { Post, PostSchema } from 'src/schemas/Post.schema';
import { Comment, CommentSchema } from 'src/schemas/Comment.schema';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema },
        {name: Comment.name, schema: CommentSchema }
    ]),
    MongooseModule
  ],
  controllers: [PostController],
  providers: [PostService, PostRepository],
  exports: [],
})
export class PostModule {}
