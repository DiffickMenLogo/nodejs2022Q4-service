import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumModule } from 'src/album/album.module';
import { FavoritesService } from './../favorites/favorites.service';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { Module } from '@nestjs/common';
import { TrackModule } from 'src/track/track.module';
import { ArtistEntity } from './entities/artist.entity';

@Module({
  imports: [TrackModule, AlbumModule, TypeOrmModule.forFeature([ArtistEntity])],
  controllers: [ArtistController],
  providers: [ArtistService],
  exports: [ArtistService],
})
export class ArtistModule {}
