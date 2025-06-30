import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PostService } from './Post.service';
import { PostCreateDTO } from './dto/createPostComment.dto';
import { PostCommentDTOFilter } from './dto/postComment.dto';
import { UpdatePostDto } from './dto/updatePost.dto';
import { BaseController } from 'src/base/BaseController';


@Controller('post')
export class PostController extends BaseController {
  constructor(private readonly postService: PostService) {
    super()
  }

  @Post()
 async  create(@Body() createDto: PostCreateDTO) {
     const result = await this.postService.create(createDto);
    return super.successReponse(result)
    }

  @Get()
  async findAll() {
     const result = await this.postService.findAll();
    return super.successReponse(result)
    }

  @Get('listpost_and_comments')
  async findAllPostAndComment(@Query() query: PostCommentDTOFilter) {
     const result = await this.postService.findAllPostAndComments(query);
    return super.successReponse(result)
    }

  @Get(':id')
  async findOne(@Param('id') id: string, @Query() query: PostCommentDTOFilter) {
     const result = await this.postService.findOne(id, query);
    return super.successReponse(result)
    }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdatePostDto) {
     const result = await this.postService.update(id, updateDto);
    return super.successReponse(result)
    }

  @Delete(':id')
  async remove(@Param('id') id: string) {
     const result = await this.postService.deletePost(id);
    return super.successReponse(result)
    }
}
