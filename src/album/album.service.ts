import { UpdateAlbumDto } from './../dto/UpdateAlbumDto';
import { checkAlbum } from 'src/utils/checkAlbum';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateAlbumDto } from 'src/dto/CreateAlbumDto';
import { Album } from 'src/types/types';
import { TrackService } from 'src/track/track.service';

@Injectable()
export class AlbumService {
  private albums = [];

  constructor(private readonly trackService: TrackService) {}

  getAllAlbums(): Album[] {
    return this.albums;
  }

  getAlbumById(id: string): Album {
    checkAlbum(id, this.albums);
    const album = this.albums.find((album) => album.id === id);
    return album;
  }

  createAlbum(album: CreateAlbumDto): Album {
    const newAlbum = {
      id: randomUUID(),
      name: album.name,
      artistId: album.artistId ? album.artistId : null,
      year: album.year,
    };
    this.albums.push(newAlbum);
    return newAlbum;
  }

  updateAlbum(id: string, album: UpdateAlbumDto): Album {
    checkAlbum(id, this.albums);
    const currentAlbum = this.albums.find((album) => album.id === id);
    if (album.name) {
      currentAlbum.name = album.name;
    }
    if (album.artistId) {
      currentAlbum.artistId = album.artistId;
    }
    if (album.year) {
      currentAlbum.year = album.year;
    }
    return currentAlbum;
  }

  deleteAlbum(id: string): Album {
    checkAlbum(id, this.albums);
    this.trackService.deleteAlbumId(id);
    const album = this.albums.find((album) => album.id === id);
    const index = this.albums.findIndex((album) => album.id === id);
    this.albums.splice(index, 1);
    return album;
  }

  deleteArtistId(id: string): void {
    this.albums.forEach((album) => {
      if (album.artistId === id) {
        album.artistId = null;
      }
    });
  }
}
