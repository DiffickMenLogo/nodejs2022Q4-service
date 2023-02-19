import { FavoritesEntity } from './entities/favorites.entity';
import { Repository, In } from 'typeorm';
import { AddToFavoriteDto } from './dto/AddToFavoriteDto';
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
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly trackService: TrackService,
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    @InjectRepository(FavoritesEntity)
    private favoritesRepository: Repository<FavoritesEntity>,
  ) {}

  // private favorites: Favorites = {
  //   artists: [],
  //   tracks: [],
  //   albums: [],
  // };

  async getAllFavorites(): Promise<FavoritesResponse> {
    const favoritesTracks = (await this.trackService.getAllTracks()).filter(
      async (track) => {
        const favorites = await this.favoritesRepository.find({
          where: { tracks: In([track.id]) },
        });
        return favorites && favorites.length > 0;
      },
    );
    const favoritesArtists = (await this.artistService.getAllArtists()).filter(
      async (artist) => {
        const favorites = await this.favoritesRepository.find({
          where: { artists: In([artist.id]) },
        });
        return favorites && favorites.length > 0;
      },
    );
    const favoritesAlbums = (await this.albumService.getAllAlbums()).filter(
      async (album) => {
        const favorites = await this.favoritesRepository.find({
          where: { albums: In([album.id]) },
        });
        return favorites && favorites.length > 0;
      },
    );
    return {
      tracks: favoritesTracks,
      artists: favoritesArtists,
      albums: favoritesAlbums,
    };
  }

  @Post(':id')
  async createFavoriteTrack(id: string): Promise<Favorites> {
    const tracks = await this.trackService.getAllTracks();
    const track = tracks.find((track) => track.id === id);
    if (!track) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: 'Track not found',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const favorites = await this.favoritesRepository.findOne({});

    favorites.tracks.push(id);

    return await this.favoritesRepository.save(favorites);
  }

  @Delete(':id')
  async deleteFavoriteTrack(id: string): Promise<Favorites> {
    const track = await this.trackService.getTrackById(id);
    const favorites = await this.favoritesRepository.findOne({});

    if (!track) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: 'Track not found',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const index = await favorites.tracks.indexOf(track.id);
    favorites.tracks.slice(index, 1);

    return favorites;
  }

  @Post(':id')
  async createFavoriteArtist(id: string): Promise<Favorites> {
    const artist = await this.artistService.getArtistById(id);

    if (!artist) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: 'Artist not found',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const favorites = await this.favoritesRepository.findOne({});
    favorites.artists.push(artist.id);

    this.favoritesRepository.save(favorites);
    return favorites;
  }

  @Delete(':id')
  async deleteFavoriteArtist(id: string): Promise<Favorites> {
    const artist = await this.artistService.getArtistById(id);
    if (!artist) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: 'Artist not found',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const favorites = await this.favoritesRepository.findOne({});
    const index = favorites.artists.indexOf(artist.id);
    favorites.artists.splice(index, 1);
    return favorites;
  }

  @Post(':id')
  async createFavoriteAlbum(id: string): Promise<Favorites> {
    const album = await this.albumService.getAlbumById(id);
    if (!album) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: 'Album not found',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const favorites = await this.favoritesRepository.findOne({});
    favorites.albums.push(album.id);
    this.favoritesRepository.save(favorites);
    return favorites;
  }

  @Delete(':id')
  async deleteFavoriteAlbum(id: string): Promise<Favorites> {
    const album = await this.albumService.getAlbumById(id);
    if (!album) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: 'Album not found',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const favorites = await this.favoritesRepository.findOne({});
    const index = favorites.albums.indexOf(album.id);
    favorites.albums.splice(index, 1);
    return favorites;
  }
}
