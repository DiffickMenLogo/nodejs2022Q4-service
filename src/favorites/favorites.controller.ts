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
  async getAllFavorites() {
    return await this.favoritesService.getAllFavorites();
  }

  @Post('track/:id')
  async createFavoriteTrack(@Param('id') id: string) {
    checkUUId(id);
    return await this.favoritesService.createFavoriteTrack(id);
  }
  @Post('artist/:id')
  async createFavoriteArtist(@Param('id') id: string) {
    checkUUId(id);
    return await this.favoritesService.createFavoriteArtist(id);
  }
  @Post('album/:id')
  async createFavoriteAlbum(@Param('id') id: string) {
    checkUUId(id);
    return await this.favoritesService.createFavoriteAlbum(id);
  }
  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteFavoriteTrack(@Param('id') id: string) {
    checkUUId(id);
    return await this.favoritesService.deleteFavoriteTrack(id);
  }
  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteFavoriteArtist(@Param('id') id: string) {
    checkUUId(id);
    return await this.favoritesService.deleteFavoriteArtist(id);
  }
  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteFavoriteAlbum(@Param('id') id: string) {
    checkUUId(id);
    return await this.favoritesService.deleteFavoriteAlbum(id);
  }
}
