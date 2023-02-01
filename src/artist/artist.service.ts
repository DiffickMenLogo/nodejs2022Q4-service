import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateArtistDto } from 'src/dto/CreateArtistDto';
import { Artist } from 'src/types/types';

@Injectable()
export class ArtistService {
  private artists = [];

  getAllArtists(): Artist[] {
    return this.artists;
  }

  getArtistById(id: string): Artist {
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
    const currentArtist = this.artists.find((artist) => artist.id === id);
    if (body.name) {
      currentArtist.name = body.name;
    }
    if (body.grammy) {
      currentArtist.grammy = body.grammy;
    }
    return currentArtist;
  }

  deleteArtist(id: string): string {
    const index = this.artists.findIndex((artist) => artist.id === id);
    this.artists.splice(index, 1);
    return 'Artist deleted';
  }
}
