import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';


@Controller('user')
export class UserController {
  constructor(private readonly userService:UserService ) {}

  @Post()
  create(@Body() createDto: CreateUserDto) {
    return this.userService.create(createDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateDto: UpdateDto) {
  //   return this.sService.update(+id, updateDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.sService.remove(+id);
  // }
}
