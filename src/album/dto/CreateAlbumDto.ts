import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  name: string;
  @IsOptional()
  @IsUUID()
  artistId?: string;
  @IsNumber()
  year: number;
}
