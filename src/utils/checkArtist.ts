import { HttpException, HttpStatus } from '@nestjs/common';
import { Artist } from 'src/types/types';
export const checkArtist = (id: string, artists: Artist[]) => {
  if (artists.find((artist) => artist.id === id) === undefined) {
    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: 'Artist not found',
      },
      HttpStatus.NOT_FOUND,
    );
  }
};
