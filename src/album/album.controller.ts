import { UpdateAlbumDto } from './dto/UpdateAlbumDto';
import { CreateAlbumDto } from './dto/CreateAlbumDto';
import { AlbumService } from './album.service';
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
import { checkUUId } from 'src/utils/checkUUID';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  async getAlbums() {
    return await this.albumService.getAllAlbums();
  }

  @Get(':id')
  async getAlbumById(@Param('id') id: string) {
    checkUUId(id);
    return await this.albumService.getAlbumById(id);
  }

  @Post()
  async createAlbum(@Body() body: CreateAlbumDto) {
    return await this.albumService.createAlbum(body);
  }

  @Put(':id')
  async updateAlbum(@Param('id') id: string, @Body() body: UpdateAlbumDto) {
    checkUUId(id);
    return await this.albumService.updateAlbum(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlbum(@Param('id') id: string) {
    checkUUId(id);
    return await this.albumService.deleteAlbum(id);
  }
}
