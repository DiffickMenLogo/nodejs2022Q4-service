import { TrackModule } from './../track/track.module';
import { AlbumService } from './../album/album.service';
import { ArtistService } from './../artist/artist.service';
import { FavoritesService } from './favorites.service';
import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { TrackService } from 'src/track/track.service';
import { AlbumModule } from 'src/album/album.module';
import { ArtistModule } from 'src/artist/artist.module';

@Module({
  imports: [TrackModule, AlbumModule, ArtistModule],
  controllers: [FavoritesController],
  providers: [FavoritesService],
  exports: [FavoritesService],
})
export class FavoritesModule {}
