import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  name: string;
  @IsOptional()
  artistId?: string;
  @IsNumber()
  year: number;
}
