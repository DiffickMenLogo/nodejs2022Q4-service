import { HttpException, HttpStatus } from '@nestjs/common';
import { isUUID } from 'class-validator';

export const checkUUId = (uuid: string) => {
  if (!isUUID(uuid)) {
    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error: 'Invalid id(not UUID))',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
};
