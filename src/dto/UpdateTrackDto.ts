import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTrackDto {
  @IsString()
  name?: string;
  @IsNumber()
  duration?: number;
  @IsOptional()
  artistId?: string;
  @IsOptional()
  albumId?: string;
}
