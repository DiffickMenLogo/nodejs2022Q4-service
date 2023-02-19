import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class AddToFavoriteDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string;
}
