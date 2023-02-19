import { AlbumEntity } from './entities/album.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackModule } from './../track/track.module';
import { FavoritesService } from './../favorites/favorites.service';
import { AlbumService } from './album.service';
import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AlbumEntity]), TrackModule],
  controllers: [AlbumController],
  providers: [AlbumService],
  exports: [AlbumService],
})
export class AlbumModule {}
