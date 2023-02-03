import { AlbumService } from './../album/album.service';
import { AlbumController } from './../album/album.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class FavoritesModule {}
