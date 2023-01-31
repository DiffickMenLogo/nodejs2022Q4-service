import { UpdateTrackDto } from './../dto/UpdateTrackDto';
import { checkUUId } from './../utils/checkUUID';
import { Injectable } from '@nestjs/common';
import { Track } from 'src/types/types';
import { randomUUID } from 'crypto';
import { CreateTrackDto } from 'src/dto/CreateTrackDto';

@Injectable()
export class TrackService {
  private tracks = [];

  getAllTracks(): Track[] {
    return this.tracks;
  }

  getTrackById(id: string): Track {
    const track = this.tracks.find((track) => track.id === id);
    return track;
  }

  createTrack(track: CreateTrackDto): Track {
    const newTrack = {
      id: randomUUID(),
      name: track.name,
      artistId: track.artistId,
      albumId: track.albumId,
      duration: track.duration,
    };
    this.tracks.push(newTrack);
    return newTrack;
  }

  updateTrack(id: string, track: UpdateTrackDto): Track {
    const currentTrack = this.tracks.find((track) => track.id === id);
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
    return currentTrack;
  }

  deleteTrack(id: string): string {
    const index = this.tracks.findIndex((track) => track.id === id);
    this.tracks.splice(index, 1);
    return 'Track deleted';
  }
}
