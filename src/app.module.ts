import { AppController } from './app.controller';
import { DeleteFavoritesMiddlewareModule } from './deleteFavoritesMiddleware.module';
import { FavoritesModule } from './favorites/favorites.module';
import { AlbumModule } from './album/album.module';
import { ArtistModule } from './artist/artist.module';
import { UserModule } from './user/user.module';
import { Module, MiddlewareConsumer } from '@nestjs/common';
import { TrackModule } from './track/track.module';
import { AppService } from './app.service';
import { SwaggerModule } from '@nestjs/swagger';

@Module({
  imports: [
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavoritesModule,
    DeleteFavoritesMiddlewareModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
