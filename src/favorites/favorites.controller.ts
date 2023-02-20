import { checkUUId } from 'src/utils/checkUUID';
import { FavoritesService } from './favorites.service';
import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  HttpStatus,
  Param,
  Body,
} from '@nestjs/common';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  getAllFavorites() {
    return this.favoritesService.getAllFavorites();
  }

  @Post('track/:id')
  createFavoriteTrack(@Param('id') id: string) {
    checkUUId(id);
    return this.favoritesService.createFavoriteTrack(id);
  }
  @Post('artist/:id')
  createFavoriteArtist(@Param('id') id: string) {
    checkUUId(id);
    return this.favoritesService.createFavoriteArtist(id);
  }
  @Post('album/:id')
  createFavoriteAlbum(@Param('id') id: string) {
    checkUUId(id);
    return this.favoritesService.createFavoriteAlbum(id);
  }
  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteFavoriteTrack(@Param('id') id: string) {
    checkUUId(id);
    return this.favoritesService.deleteFavoriteTrack(id);
  }
  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteFavoriteArtist(@Param('id') id: string) {
    checkUUId(id);
    return this.favoritesService.deleteFavoriteArtist(id);
  }
  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteFavoriteAlbum(@Param('id') id: string) {
    checkUUId(id);
    return this.favoritesService.deleteFavoriteAlbum(id);
  }
}
