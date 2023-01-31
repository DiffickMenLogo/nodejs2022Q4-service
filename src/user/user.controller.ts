import { checkUser } from './../utils/checkUser';
import { checkUUId } from './../utils/checkUUID';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { isUUID } from 'class-validator';
import { CreateUserDto } from 'src/dto/CreateUserDto';
import { UpdatePasswordDto } from 'src/dto/UpdatePasswordDto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUser() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    checkUUId(id);
    checkUser(id, this.userService);
    return this.userService.getUserById(id);
  }

  @Post()
  createUser(@Body() body: CreateUserDto) {
    return this.userService.createUser(body);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() body: UpdatePasswordDto) {
    checkUUId(id);
    checkUser(id, this.userService);
    return this.userService.updateUser(id, body);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    checkUUId(id);
    checkUser(id, this.userService);
    return this.userService.deleteUser(id);
  }
}
