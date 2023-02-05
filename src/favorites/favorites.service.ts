import { AddToFavoriteDto } from './../dto/AddToFavoriteDto';
import { AlbumService } from './../album/album.service';
import { ArtistService } from './../artist/artist.service';
import { TrackService } from './../track/track.service';
import {
  Delete,
  HttpCode,
  Injectable,
  Post,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import {
  Artist,
  Favorites,
  FavoritesResponse,
  Track,
  Album,
} from 'src/types/types';

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

  getAllFavorites(): FavoritesResponse {
    const favoritesTracks = this.favorites.tracks.map((trackId) =>
      this.trackService.getTrackById(trackId),
    );
    const favoritesArtists = this.favorites.artists.map((artistId) => {
      return this.artistService.getArtistById(artistId);
    });
    const favoritesAlbums = this.favorites.albums.map((albumId) => {
      return this.albumService.getAlbumById(albumId);
    });
    return {
      tracks: favoritesTracks,
      artists: favoritesArtists,
      albums: favoritesAlbums,
    };
  }

  @Post(':id')
  createFavoriteTrack(id: string): Favorites {
    const track = this.trackService.getTrackById(id);
    if (!track) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: 'Track not found',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    } else {
      this.favorites.tracks.push(track.id);
      return this.favorites;
    }
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
    if (!artist) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: 'Artist not found',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    } else {
      this.favorites.artists.push(artist.id);
      return this.favorites;
    }
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
    if (!album) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: 'Album not found',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    } else {
      this.favorites.albums.push(album.id);
      return this.favorites;
    }
  }

  @Delete(':id')
  deleteFavoriteAlbum(id: string): Favorites {
    const album = this.albumService.getAlbumById(id);
    const index = this.favorites.albums.indexOf(album.id);
    this.favorites.albums.splice(index, 1);
    return this.favorites;
  }
}
