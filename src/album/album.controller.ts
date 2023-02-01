import { CreateAlbumDto } from './../dto/CreateAlbumDto';
import { AlbumService } from './album.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { checkUUId } from 'src/utils/checkUUID';
import { checkAlbum } from 'src/utils/checkAlbum';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  getAlbums() {
    return this.albumService.getAllAlbums();
  }

  @Get(':id')
  getAlbumById(@Param('id') id: string) {
    checkUUId(id);
    checkAlbum(id, this.albumService);
    return this.albumService.getAlbumById(id);
  }

  @Post()
  createAlbum(body: CreateAlbumDto) {
    return this.albumService.createAlbum(body);
  }

  @Put(':id')
  updateAlbum(@Param('id') id: string, @Body() body) {
    checkUUId(id);
    checkAlbum(id, this.albumService);
    return this.albumService.updateAlbum(id, body);
  }

  @Delete(':id')
  deleteAlbum(@Param('id') id: string) {
    checkUUId(id);
    checkAlbum(id, this.albumService);
    return this.albumService.deleteAlbum(id);
  }
}
