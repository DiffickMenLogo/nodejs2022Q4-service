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
  getAlbums() {
    return this.albumService.getAllAlbums();
  }

  @Get(':id')
  getAlbumById(@Param('id') id: string) {
    checkUUId(id);
    return this.albumService.getAlbumById(id);
  }

  @Post()
  createAlbum(@Body() body: CreateAlbumDto) {
    return this.albumService.createAlbum(body);
  }

  @Put(':id')
  updateAlbum(@Param('id') id: string, @Body() body: UpdateAlbumDto) {
    checkUUId(id);
    return this.albumService.updateAlbum(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbum(@Param('id') id: string) {
    checkUUId(id);

    return this.albumService.deleteAlbum(id);
  }
}
