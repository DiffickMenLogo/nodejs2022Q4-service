import { FavoritesEntity } from './entities/favorites.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackModule } from './../track/track.module';
import { FavoritesService } from './favorites.service';
import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { AlbumModule } from 'src/album/album.module';
import { ArtistModule } from 'src/artist/artist.module';

@Module({
  imports: [
    TrackModule,
    AlbumModule,
    ArtistModule,
    TypeOrmModule.forFeature([FavoritesEntity]),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
  exports: [FavoritesService],
})
export class FavoritesModule {}
