import { JwtModule } from '@nestjs/jwt';
import { JwtMiddlewareModule } from './middleware/jwtMiddleware/jwt.middleware.module';
import { AppController } from './app.controller';
import { DeleteFavoritesMiddlewareModule } from './middleware/deleteMiddleware/deleteFavoritesMiddleware.module';
import { FavoritesModule } from './favorites/favorites.module';
import { AlbumModule } from './album/album.module';
import { ArtistModule } from './artist/artist.module';
import { UserModule } from './user/user.module';
import { Module, MiddlewareConsumer } from '@nestjs/common';
import { TrackModule } from './track/track.module';
import { AppService } from './app.service';
import { SwaggerModule } from '@nestjs/swagger';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { dataSourceOptions } from './ormconfig';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env',
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavoritesModule,
    DeleteFavoritesMiddlewareModule,
    AuthModule,
    JwtMiddlewareModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
