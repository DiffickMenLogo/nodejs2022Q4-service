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
  UseGuards,
} from '@nestjs/common';
import { CreateTrackDto } from 'src/track/dto/CreateTrackDto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  async getTrack() {
    return await this.trackService.getAllTracks();
  }

  @Get(':id')
  async getTrackById(@Param('id') id: string) {
    checkUUId(id);
    return await this.trackService.getTrackById(id);
  }

  @Post()
  async createTrack(@Body() body: CreateTrackDto) {
    return await this.trackService.createTrack(body);
  }

  @Put(':id')
  async updateTrack(@Param('id') id: string, @Body() body: UpdateTrackDto) {
    checkUUId(id);
    return await this.trackService.updateTrack(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrack(@Param('id') id: string) {
    checkUUId(id);
    return await this.trackService.deleteTrack(id);
  }
}
