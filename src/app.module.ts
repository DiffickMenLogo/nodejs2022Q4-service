import { DeleteFavoritesMiddlewareModule } from './deleteFavoritesMiddleware.module';
import { FavoritesModule } from './favorites/favorites.module';
import { AlbumModule } from './album/album.module';
import { ArtistModule } from './artist/artist.module';
import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';
import { TrackModule } from './track/track.module';

@Module({
  imports: [
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavoritesModule,
    DeleteFavoritesMiddlewareModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
