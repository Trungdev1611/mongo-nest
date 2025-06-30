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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateDto } from './dto/updateUser.dto';
import { BaseController } from 'src/base/BaseController';
import { QueryFilterUserDTO } from './dto/QueryFilterUser.dto';

@Controller('user')
export class UserController extends BaseController {
  constructor(private readonly userService: UserService) {
    super()
  }

  @Post()
  create(@Body() createDto: CreateUserDto) {
    const result = this.userService.create(createDto);
    return super.successReponse(result)
  }

  @Get()
  async findAll() {
    const result = await  this.userService.findAll();
    return super.successReponse(result)
  }

  @Get(`custom_repo`)
  async findAllCustomRepo() {
    const result = await this.userService.findAllCustomModel();
    return super.successReponse(result)
  }

  @Post(`custom_repo/new`)
  createNew(@Body() createDto: CreateUserDto) {
    const result =  this.userService.create(createDto);
    return super.successReponse(result)
  }

  @Get('detail/:id')
  async findOne(@Param('id') id: string) {
    const result = await this.userService.findOne(id);
    return super.successReponse(result)

  }

  @Patch('custom_repo/:id')
  update(@Param('id') id: string, @Body() updateDto: UpdateDto) {
    const result = this.userService.update(id, updateDto);
    return super.successReponse(result)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const result = this.userService.remove(id);
    return super.successReponse(result)
  }

  @Get('find_all_and_paginate')
  async findAllAndPaginate(@Query() query: QueryFilterUserDTO){
    const [data, total] = await this.userService.findAndPaginate(query)
    return super.paginateResponse(data, total)
  }
}
