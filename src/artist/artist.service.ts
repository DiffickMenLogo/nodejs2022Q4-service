import { Repository } from 'typeorm';
import { TrackService } from './../track/track.service';
import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateArtistDto } from 'src/artist/dto/CreateArtistDto';
import { Artist } from 'src/types/types';
import { AlbumService } from 'src/album/album.service';
import { UpdateArtistDto } from 'src/artist/dto/UpdateArtistDto';
import { ArtistEntity } from './entities/artist.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ArtistService {
  private artists = [];

  constructor(
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
  ) {}

  async getAllArtists(): Promise<Artist[]> {
    const artists = await this.artistRepository.find();
    return artists.map((artist) => artist.toResponse());
  }

  async getArtistById(artistId: string): Promise<Artist> {
    const artist = await this.artistRepository.findOne({
      where: { id: artistId },
    });

    if (!artist) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Artist not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    if (artist) return artist.toResponse();
  }

  async createArtist(body: CreateArtistDto): Promise<Artist> {
    const newArtist = {
      id: randomUUID(),
      name: body.name,
      grammy: body.grammy,
    };
    const createdArtist = await this.artistRepository.create(newArtist);
    return (await this.artistRepository.save(createdArtist)).toResponse();
  }

  async updateArtist(artistId: string, body: UpdateArtistDto): Promise<Artist> {
    const currentArtist = await this.artistRepository.findOne({
      where: { id: artistId },
    });
    if (!currentArtist) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Artist not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    if (body.name) {
      currentArtist.name = body.name;
    }
    if (typeof body.grammy === 'boolean') {
      currentArtist.grammy = body.grammy;
    }
    return await this.artistRepository.save(currentArtist);
  }

  async deleteArtist(artistId: string): Promise<string> {
    const artist = await this.artistRepository.findOne({
      where: { id: artistId },
    });

    if (!artist) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Artist not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    await this.trackService.deleteArtistId(artistId);
    await this.albumService.deleteArtistId(artistId);
    await this.artistRepository.delete(artistId);

    return 'Artist deleted';
  }
}
