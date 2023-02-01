import { HttpException, HttpStatus } from '@nestjs/common';
import { ArtistService } from './../artist/artist.service';
export const checkArtist = (id: string, artistService: ArtistService) => {
  const artist = artistService.getArtistById(id);
  if (!artistService.getArtistById(id)) {
    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: 'Artist not found',
      },
      HttpStatus.NOT_FOUND,
    );
  }
};
