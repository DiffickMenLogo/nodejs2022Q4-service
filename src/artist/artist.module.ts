import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
