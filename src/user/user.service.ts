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
import { User } from 'src/types/types';

@Injectable()
export class UserService {
  private users = [];

  getAllUsers(): User[] {
    return this.users;
  }

  getUserById(id: string): User {
    const user = this.users.find((user) => user.id === id);
    return user;
  }

  createUser(user: CreateUserDto): User {
    const newUser = {
      id: randomUUID(),
      login: user.login,
      password: user.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(id: string, user): User {
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
      return currentUser;
    }
  }

  deleteUser(id: string): User {
    const user = this.users.find((user) => user.id === id);
    const index = this.users.findIndex((user) => user.id === id);
    this.users.splice(index, 1);
    return user;
  }
}
