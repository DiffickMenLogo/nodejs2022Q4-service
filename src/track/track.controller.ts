import { DeleteFavoritesMiddleware } from './../deleteFavorites.middleware';
import { UpdateTrackDto } from './../dto/UpdateTrackDto';
import { checkTrack } from './../utils/checkTrack';
import { checkUUId } from './../utils/checkUUID';
import { TrackService } from './track.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTrackDto } from 'src/dto/CreateTrackDto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  async getTrack() {
    return this.trackService.getAllTracks();
  }

  @Get(':id')
  async getTrackById(@Param('id') id: string) {
    checkUUId(id);
    checkTrack(id, this.trackService);
    return this.trackService.getTrackById(id);
  }

  @Post()
  createTrack(@Body() body: CreateTrackDto) {
    return this.trackService.createTrack(body);
  }

  @Put(':id')
  updateTrack(@Param('id') id: string, @Body() body: UpdateTrackDto) {
    checkUUId(id);
    checkTrack(id, this.trackService);
    return this.trackService.updateTrack(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrack(@Param('id') id: string) {
    checkUUId(id);
    checkTrack(id, this.trackService);
    return this.trackService.deleteTrack(id);
  }
}
