import { isNumber, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  name: string;
  @IsNumber()
  duration: number;
  @IsOptional()
  artistId?: string;
  @IsOptional()
  albumId?: string;
}
