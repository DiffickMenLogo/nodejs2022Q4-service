import { Repository } from 'typeorm';
import { CreateTrackDto } from 'src/track/dto/CreateTrackDto';
import { FavoritesService } from './../favorites/favorites.service';
import { UpdateTrackDto } from './dto/UpdateTrackDto';
import { checkUUId } from './../utils/checkUUID';
import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Track } from 'src/types/types';
import { randomUUID } from 'crypto';
import { TrackEntity } from './entities/track.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
  ) {}

  async getAllTracks(): Promise<Track[]> {
    const tracks = await this.trackRepository.find();
    return tracks;
  }

  async getTrackById(trackId: string): Promise<Track> {
    const track = await this.trackRepository.findOne({
      where: { id: trackId },
    });

    if (!track) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Track not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return track;
  }

  async createTrack(track: CreateTrackDto): Promise<Track> {
    const newTrack = {
      id: randomUUID(),
      name: track.name,
      artistId: track.artistId ? track.artistId : null,
      albumId: track.albumId ? track.albumId : null,
      duration: track.duration,
    };

    const createdTrack = await this.trackRepository.create(newTrack);

    return await this.trackRepository.save(createdTrack);
  }

  async updateTrack(trackId: string, track: UpdateTrackDto): Promise<Track> {
    const currentTrack = await this.trackRepository.findOne({
      where: { id: trackId },
    });

    if (!currentTrack) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Track not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    if (track.name) {
      currentTrack.name = track.name;
    }
    if (track.artistId) {
      currentTrack.artistId = track.artistId;
    }
    if (track.albumId) {
      currentTrack.albumId = track.albumId;
    }
    if (track.duration) {
      currentTrack.duration = track.duration;
    }
    return await this.trackRepository.save(currentTrack);
  }

  async deleteTrack(trackId: string): Promise<string> {
    const track = await this.trackRepository.findOne({
      where: { id: trackId },
    });

    if (!track) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Track not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    await this.trackRepository.delete(trackId);

    return 'Track deleted';
  }

  async deleteArtistId(id: string): Promise<void> {
    (await this.trackRepository.find({ where: { artistId: id } })).map(
      (track) => {
        track.artistId = null;
        this.trackRepository.save(track);
      },
    );
  }

  async deleteAlbumId(id: string): Promise<void> {
    (await this.trackRepository.find({ where: { albumId: id } })).map(
      (track) => {
        track.albumId = null;
        this.trackRepository.save(track);
      },
    );
  }
}
