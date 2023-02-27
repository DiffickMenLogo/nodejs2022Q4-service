import { FavoritesService } from './../../favorites/favorites.service';
import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Injectable()
export class DeleteFavoritesMiddleware implements NestMiddleware {
  constructor(private readonly favoritesService: FavoritesService) {}

  async use(req: any, res: any, next: () => void) {
    try {
      if (req.method === 'DELETE') {
        const id = req.params.id;
        const type = req.originalUrl.split('/')[2];
        switch (type) {
          case 'track':
            await this.favoritesService.deleteFavoriteTrack(id);
            break;
          case 'artist':
            await this.favoritesService.deleteFavoriteArtist(id);
            break;
          case 'album':
            await this.favoritesService.deleteFavoriteAlbum(id);
            break;
        }
      }
      next();
    } catch (e) {
      throw new HttpException(
        'Error in delete middleware',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
