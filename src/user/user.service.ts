import { CreateUserDto } from './../dto/CreateUserDto';
import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
  Req,
  Res,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { User, UserResponse } from 'src/types/types';
import { checkUser } from 'src/utils/checkUser';

@Injectable()
export class UserService {
  private users = [];

  getAllUsers(): UserResponse[] {
    return this.users.map((user) => ({
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));
  }

  getUserById(id: string): UserResponse {
    checkUser(id, this.users);
    const user = this.users.find((user) => user.id === id);
    return {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  createUser(user: CreateUserDto): UserResponse {
    const newUser = {
      id: randomUUID(),
      login: user.login,
      password: user.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.users.push(newUser);
    return {
      id: newUser.id,
      login: newUser.login,
      version: newUser.version,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    };
  }

  updateUser(id: string, user): UserResponse {
    checkUser(id, this.users);
    const currentUser = this.users.find((user) => user.id === id);
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
      return {
        id: currentUser.id,
        login: currentUser.login,
        version: currentUser.version,
        createdAt: currentUser.createdAt,
        updatedAt: currentUser.updatedAt,
      };
    }
  }
  deleteUser(id: string): User {
    checkUser(id, this.users);
    const user = this.users.find((user) => user.id === id);
    const index = this.users.findIndex((user) => user.id === id);
    this.users.splice(index, 1);
    return user;
  }
}
