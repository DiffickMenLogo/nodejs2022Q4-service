import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateAlbumDto {
  @IsString()
  name: string;
  @IsOptional()
  @IsUUID()
  artistId?: string;
  @IsNumber()
  year: number;
}
