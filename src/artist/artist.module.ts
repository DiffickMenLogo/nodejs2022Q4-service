import { FavoritesService } from './../favorites/favorites.service';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [ArtistController],
  providers: [ArtistService],
  exports: [ArtistService],
})
export class ArtistModule {}
