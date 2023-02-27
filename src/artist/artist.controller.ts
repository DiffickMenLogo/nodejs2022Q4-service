import { UpdateArtistDto } from './dto/UpdateArtistDto';
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
import { CreateArtistDto } from 'src/artist/dto/CreateArtistDto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}
  @Get()
  async getAllArtists() {
    return await this.artistService.getAllArtists();
  }

  @Get(':id')
  async getArtistById(@Param('id') id: string) {
    checkUUId(id);
    return await this.artistService.getArtistById(id);
  }

  @Post()
  async createArtist(@Body() body: CreateArtistDto) {
    return await this.artistService.createArtist(body);
  }

  @Put(':id')
  async updateArtist(@Param('id') id: string, @Body() body: UpdateArtistDto) {
    checkUUId(id);
    return await this.artistService.updateArtist(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtist(@Param('id') id: string) {
    checkUUId(id);
    return await this.artistService.deleteArtist(id);
  }
}
