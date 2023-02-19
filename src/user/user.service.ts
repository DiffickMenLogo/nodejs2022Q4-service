import { UpdatePasswordDto } from './dto/UpdatePasswordDto';
import { randomUUID } from 'crypto';
import { CreateUserDto } from './dto/CreateUserDto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserResponse } from 'src/types/types';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getAllUsers(): Promise<UserResponse[]> {
    const users = await this.userRepository.find();
    return users.map((user) => user.toResponse());
  }

  async getUserById(userId: string): Promise<UserResponse> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'User not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    if (user) return user.toResponse();
  }

  async createUser(user: CreateUserDto): Promise<UserResponse> {
    const newUser = {
      id: randomUUID(),
      login: user.login,
      password: user.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    const createdUser = this.userRepository.create(newUser);
    return (await this.userRepository.save(createdUser)).toResponse();
  }

  async updateUser(id: string, user: UpdatePasswordDto): Promise<UserResponse> {
    const currentUser = await this.userRepository.findOne({ where: { id } });
    if (!currentUser) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'User not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    if (currentUser.password !== user.oldPassword) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Invalid password',
        },
        HttpStatus.FORBIDDEN,
      );
    } else {
      currentUser.password = user.newPassword;
      currentUser.updatedAt = Date.now();
      currentUser.version += 1;
      const updatedUser = await this.userRepository.save(currentUser);
      delete updatedUser.password;
      return updatedUser;
    }
  }
  async deleteUser(userId: string): Promise<string> {
    const user = this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'User not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    await this.userRepository.delete(userId);
    return 'User deleted';
  }
}
