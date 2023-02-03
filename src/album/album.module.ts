import { FavoritesService } from './../favorites/favorites.service';
import { AlbumService } from './album.service';
import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';

@Module({
  imports: [],
  controllers: [AlbumController],
  providers: [AlbumService],
  exports: [AlbumService],
})
export class AlbumModule {}
