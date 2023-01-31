import { HttpException, HttpStatus } from '@nestjs/common';
import { TrackService } from './../track/track.service';
export const checkTrack = (id: string, trackService: TrackService) => {
  if (!trackService.getTrackById(id)) {
    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: 'Track not found',
      },
      HttpStatus.NOT_FOUND,
    );
  }
};
