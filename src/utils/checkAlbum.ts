import { HttpException, HttpStatus } from '@nestjs/common';
import { AlbumService } from './../album/album.service';

export const checkAlbum = (id: string, albumService: AlbumService) => {
  if (!albumService.getAlbumById(id)) {
    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: 'Album not found',
      },
      HttpStatus.NOT_FOUND,
    );
  }
};
