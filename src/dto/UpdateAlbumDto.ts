import { IsOptional, IsString } from 'class-validator';

export class UpdateAlbumDto {
  @IsString()
  name: string;
  @IsOptional()
  artistId?: string;
  @IsString()
  year: number;
}
