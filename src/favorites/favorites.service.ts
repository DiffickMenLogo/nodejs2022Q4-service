import { randomUUID } from 'crypto';
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

  async getAllFavorites(): Promise<FavoritesResponse> {
    const favorites = await this.favoritesRepository.find();
    const trackIds = favorites.map((favorite) => favorite.track);
    const artistIds = favorites.map((favorite) => favorite.artist);
    const albumIds = favorites.map((favorite) => favorite.album);
    const tracks = (await this.trackService.getAllTracks()).filter((track) =>
      trackIds.includes(track.id),
    );

    const artists = (await this.artistService.getAllArtists()).filter(
      (artist) => artistIds.includes(artist.id),
    );

    const albums = (await this.albumService.getAllAlbums()).filter((album) =>
      albumIds.includes(album.id),
    );
    return {
      tracks,
      artists,
      albums,
    };
  }

  @Post(':id')
  async createFavoriteTrack(id: string): Promise<string> {
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

    const createdFavoriteTrack = await this.favoritesRepository.create({
      id: randomUUID(),
      artist: null,
      album: null,
      track: id,
    });
    await this.favoritesRepository.save(createdFavoriteTrack);

    return `Track with id = ${id} added to favorite track`;
  }

  @Delete(':id')
  async deleteFavoriteTrack(id: string): Promise<string> {
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

    const favorite = await this.favoritesRepository.findOne({
      where: { track: id },
    });

    if (!favorite) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Cant found current favorite with this track',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    if (favorite) {
      await this.favoritesRepository.delete(favorite.id);
    }

    return `Track with id = ${id} deleted from favorites`;
  }

  @Post(':id')
  async createFavoriteArtist(id: string): Promise<string> {
    const artists = await this.artistService.getAllArtists();
    const artist = artists.find((artist) => artist.id === id);

    if (!artist) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: 'Artist not found',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (artist) {
      const createdFavoriteArtist = await this.favoritesRepository.create({
        id: randomUUID(),
        artist: id,
      });
      await this.favoritesRepository.save(createdFavoriteArtist);
    }

    return `Artist with id = ${id} added to favorites`;
  }

  @Delete(':id')
  async deleteFavoriteArtist(id: string): Promise<string> {
    const artists = await this.artistService.getAllArtists();
    const artist = artists.find((artist) => artist.id === id);

    if (!artist) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: 'Artist not found',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const favorite = await this.favoritesRepository.findOne({
      where: { artist: id },
    });

    if (!favorite) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Cant found current favorite with this artist',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    if (favorite) {
      await this.favoritesRepository.delete(favorite.id);
    }

    return `Artist with id = ${id} deleted from favorites`;
  }

  @Post(':id')
  async createFavoriteAlbum(id: string): Promise<string> {
    const albums = await this.albumService.getAllAlbums();
    const album = albums.find((album) => album.id === id);

    if (!album) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: 'Album not found',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (album) {
      const createdFavoriteAlbum = await this.favoritesRepository.create({
        id: randomUUID(),
        album: id,
      });
      await this.favoritesRepository.save(createdFavoriteAlbum);
    }

    return `Album with id = ${id} added to favorites`;
  }

  @Delete(':id')
  async deleteFavoriteAlbum(id: string): Promise<string> {
    const albums = await this.albumService.getAllAlbums();
    const album = albums.find((album) => album.id === id);

    if (!album) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: 'Album not found',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const favorite = await this.favoritesRepository.findOne({
      where: { album: id },
    });

    if (!favorite) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Cant found current favorite with this album',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    if (favorite) {
      await this.favoritesRepository.delete(favorite.id);
    }

    return `Album with id = ${id} deleted from favorites`;
  }
}
