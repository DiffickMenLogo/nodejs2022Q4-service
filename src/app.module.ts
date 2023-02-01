import { ArtistModule } from './artist/artist.module';
import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrackModule } from './track/track.module';
import { ArtistController } from './artist/artist.controller';
import { AlbumController } from './album/album.controller';

@Module({
  imports: [UserModule, TrackModule, ArtistModule],
  controllers: [AppController, AlbumController],
  providers: [AppService],
})
export class AppModule {}
