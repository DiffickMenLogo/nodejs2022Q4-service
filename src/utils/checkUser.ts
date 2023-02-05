import { HttpException, HttpStatus } from '@nestjs/common';
import { User } from 'src/types/types';
export const checkUser = (id: string, users: User[]) => {
  if (users.find((user) => user.id === id) === undefined) {
    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: 'User not found',
      },
      HttpStatus.NOT_FOUND,
    );
  }
};
