import { HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './../user/user.service';
export const checkUser = (id: string, userService: UserService) => {
  if (!userService.getUserById(id)) {
    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: 'User not found',
      },
      HttpStatus.NOT_FOUND,
    );
  }
};
