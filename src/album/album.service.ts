import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateAlbumDto } from 'src/dto/CreateAlbumDto';
import { Album } from 'src/types/types';

@Injectable()
export class AlbumService {
  private albums = [];

  getAllAlbums(): Album[] {
    return this.albums;
  }

  getAlbumById(id: string): Album {
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

  updateAlbum(id: string, album: CreateAlbumDto): Album {
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

  deleteAlbum(id: string): string {
    const index = this.albums.findIndex((album) => album.id === id);
    this.albums.splice(index, 1);
    return 'Album deleted';
  }
}
