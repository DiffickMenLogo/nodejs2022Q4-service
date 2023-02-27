import { checkUUId } from './../utils/checkUUID';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/CreateUserDto';
import { UpdatePasswordDto } from 'src/user/dto/UpdatePasswordDto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUser() {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    checkUUId(id);
    return await this.userService.getUserById(id);
  }

  @Post()
  async createUser(@Body() body: CreateUserDto) {
    return await this.userService.createUser(body);
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() body: UpdatePasswordDto) {
    checkUUId(id);
    return await this.userService.updateUser(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id') id: string) {
    checkUUId(id);
    return await this.userService.deleteUser(id);
  }
}
