import { AlbumEntity } from './entities/album.entity';
import { Repository } from 'typeorm';
import { UpdateAlbumDto } from './dto/UpdateAlbumDto';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateAlbumDto } from 'src/album/dto/CreateAlbumDto';
import { Album } from 'src/types/types';
import { TrackService } from 'src/track/track.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
    private readonly trackService: TrackService,
  ) {}

  async getAllAlbums(): Promise<Album[]> {
    const albums = await this.albumRepository.find();
    return albums.map((album) => album.toResponse());
  }

  async getAlbumById(albumId: string): Promise<Album> {
    const album = await this.albumRepository.findOne({
      where: { id: albumId },
    });

    if (!album) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Album not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    if (album) return album.toResponse();
  }

  async createAlbum(album: CreateAlbumDto): Promise<Album> {
    const newAlbum = {
      id: randomUUID(),
      name: album.name,
      artistId: album.artistId ? album.artistId : null,
      year: album.year,
    };
    const createdAlbum = this.albumRepository.create(newAlbum);
    return (await this.albumRepository.save(createdAlbum)).toResponse();
  }

  async updateAlbum(albumId: string, album: UpdateAlbumDto): Promise<Album> {
    const currentAlbum = await this.albumRepository.findOne({
      where: { id: albumId },
    });
    if (!currentAlbum) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Album not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    if (album.name) {
      currentAlbum.name = album.name;
    }
    if (album.artistId) {
      currentAlbum.artistId = album.artistId;
    }
    if (album.year) {
      currentAlbum.year = album.year;
    }
    if (currentAlbum) {
      return await this.albumRepository.save(currentAlbum);
    }
  }

  async deleteAlbum(albumId: string): Promise<string> {
    const album = await this.albumRepository.findOne({
      where: { id: albumId },
    });
    if (!album) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Album not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    await this.trackService.deleteAlbumId(albumId);

    await this.albumRepository.delete(albumId);

    return 'Album deleted';
  }

  async deleteArtistId(albumId: string): Promise<void> {
    (await this.albumRepository.find({ where: { artistId: albumId } })).map(
      (album) => {
        album.artistId = null;
        this.albumRepository.save(album);
      },
    );
  }
}
