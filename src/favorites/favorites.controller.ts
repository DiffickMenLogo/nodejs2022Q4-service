import { checkUUId } from 'src/utils/checkUUID';
import { FavoritesService } from './favorites.service';
import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  HttpStatus,
} from '@nestjs/common';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  getAllFavorites() {
    return this.favoritesService.getAllFavorites();
  }

  @Post('track/:id')
  createFavoriteTrack(id: string) {
    checkUUId(id);
    return this.favoritesService.createFavoriteTrack(id);
  }
  @Post('artist/:id')
  createFavoriteArtist(id: string) {
    checkUUId(id);
    return this.favoritesService.createFavoriteArtist(id);
  }
  @Post('album/:id')
  createFavoriteAlbum(id: string) {
    checkUUId(id);
    return this.favoritesService.createFavoriteAlbum(id);
  }
  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteFavoriteTrack(id: string) {
    checkUUId(id);
    return this.favoritesService.deleteFavoriteTrack(id);
  }
  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteFavoriteArtist(id: string) {
    checkUUId(id);
    return this.favoritesService.deleteFavoriteArtist(id);
  }
  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteFavoriteAlbum(id: string) {
    checkUUId(id);
    return this.favoritesService.deleteFavoriteAlbum(id);
  }
}
