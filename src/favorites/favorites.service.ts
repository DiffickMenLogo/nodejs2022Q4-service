import { AlbumService } from './../album/album.service';
import { ArtistService } from './../artist/artist.service';
import { TrackService } from './../track/track.service';
import { Delete, Injectable, Post } from '@nestjs/common';
import { Artist, Favorites, FavoritesResponse } from 'src/types/types';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly trackService: TrackService,
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
  ) {}

  private favorites: Favorites = {
    artists: [],
    tracks: [],
    albums: [],
  };

  getAllFavorites(): Favorites {
    return this.favorites;
  }

  @Post(':id')
  createFavoriteTrack(id: string): Favorites {
    const track = this.trackService.getTrackById(id);
    this.favorites.tracks.push(track.id);
    return this.favorites;
  }

  @Delete(':id')
  deleteFavoriteTrack(id: string): Favorites {
    const track = this.trackService.getTrackById(id);
    const index = this.favorites.tracks.indexOf(track.id);
    this.favorites.tracks.splice(index, 1);
    return this.favorites;
  }

  @Post(':id')
  createFavoriteArtist(id: string): Favorites {
    const artist = this.artistService.getArtistById(id);
    this.favorites.artists.push(artist.id);
    return this.favorites;
  }

  @Delete(':id')
  deleteFavoriteArtist(id: string): Favorites {
    const artist = this.artistService.getArtistById(id);
    const index = this.favorites.artists.indexOf(artist.id);
    this.favorites.artists.splice(index, 1);
    return this.favorites;
  }

  @Post(':id')
  createFavoriteAlbum(id: string): Favorites {
    const album = this.albumService.getAlbumById(id);
    this.favorites.albums.push(album.id);
    return this.favorites;
  }

  @Delete(':id')
  deleteFavoriteAlbum(id: string): Favorites {
    const album = this.albumService.getAlbumById(id);
    const index = this.favorites.albums.indexOf(album.id);
    this.favorites.albums.splice(index, 1);
    return this.favorites;
  }
}
