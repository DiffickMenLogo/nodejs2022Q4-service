import { UpdateArtistDto } from './../dto/UpdateArtistDto';
import { checkUUId } from './../utils/checkUUID';
import { ArtistService } from './artist.service';
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
import { CreateArtistDto } from 'src/dto/CreateArtistDto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}
  @Get()
  getAllArtists() {
    return this.artistService.getAllArtists();
  }

  @Get(':id')
  getArtistById(@Param('id') id: string) {
    checkUUId(id);
    return this.artistService.getArtistById(id);
  }

  @Post()
  createArtist(@Body() body: CreateArtistDto) {
    return this.artistService.createArtist(body);
  }

  @Put(':id')
  updateArtist(@Param('id') id: string, @Body() body: UpdateArtistDto) {
    checkUUId(id);
    return this.artistService.updateArtist(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtist(@Param('id') id: string) {
    checkUUId(id);
    return this.artistService.deleteArtist(id);
  }
}
