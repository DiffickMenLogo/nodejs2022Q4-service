import { TrackService } from './../track/track.service';
import { checkArtist } from './../utils/checkArtist';
import { FavoritesService } from './../favorites/favorites.service';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateArtistDto } from 'src/dto/CreateArtistDto';
import { Artist } from 'src/types/types';
import { AlbumService } from 'src/album/album.service';

@Injectable()
export class ArtistService {
  private artists = [];

  constructor(
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}

  getAllArtists(): Artist[] {
    return this.artists;
  }

  getArtistById(id: string): Artist {
    checkArtist(id, this.artists);
    const artist = this.artists.find((artist) => artist.id === id);
    return artist;
  }

  createArtist(body: CreateArtistDto): Artist {
    const newArtist = {
      id: randomUUID(),
      name: body.name,
      grammy: body.grammy,
    };
    this.artists.push(newArtist);
    return newArtist;
  }

  updateArtist(id: string, body): Artist {
    checkArtist(id, this.artists);
    const currentArtist = this.artists.find((artist) => artist.id === id);
    if (body.name) {
      currentArtist.name = body.name;
    }
    if (body.grammy) {
      currentArtist.grammy = body.grammy;
    }
    return currentArtist;
  }

  deleteArtist(id: string): Artist {
    checkArtist(id, this.artists);
    this.trackService.deleteArtistId(id);
    this.albumService.deleteArtistId(id);
    const artist = this.artists.find((artist) => artist.id === id);
    const index = this.artists.findIndex((artist) => artist.id === id);
    this.artists.splice(index, 1);
    return artist;
  }
}
