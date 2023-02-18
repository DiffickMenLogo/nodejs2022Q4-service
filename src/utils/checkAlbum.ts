import { HttpException, HttpStatus } from '@nestjs/common';
import { Album } from 'src/types/types';

export const checkAlbum = (id: string, albums: Album[]) => {
  if (albums.find((album) => album.id === id) === undefined) {
    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: 'Album not found',
      },
      HttpStatus.NOT_FOUND,
    );
  }
};
