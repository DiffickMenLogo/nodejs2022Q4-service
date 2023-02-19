import { FavoritesModule } from './../favorites/favorites.module';
import { FavoritesService } from './../favorites/favorites.service';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { forwardRef, Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [TrackController],
  providers: [TrackService],
  exports: [TrackService],
})
export class TrackModule {}
