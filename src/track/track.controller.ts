import { DeleteFavoritesMiddleware } from './../deleteFavorites.middleware';
import { UpdateTrackDto } from './dto/UpdateTrackDto';
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
import { CreateTrackDto } from 'src/track/dto/CreateTrackDto';

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
    return this.trackService.getTrackById(id);
  }

  @Post()
  createTrack(@Body() body: CreateTrackDto) {
    return this.trackService.createTrack(body);
  }

  @Put(':id')
  updateTrack(@Param('id') id: string, @Body() body: UpdateTrackDto) {
    checkUUId(id);
    return this.trackService.updateTrack(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrack(@Param('id') id: string) {
    checkUUId(id);
    return this.trackService.deleteTrack(id);
  }
}
