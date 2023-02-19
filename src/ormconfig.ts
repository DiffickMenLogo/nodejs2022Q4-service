import { TrackEntity } from './track/entities/track.entity';
import { FavoritesEntity } from './favorites/entities/favorites.entity';
import { ArtistEntity } from './artist/entities/artist.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import * as dotenv from 'dotenv';
import { DataSourceOptions } from 'typeorm';
import { AlbumEntity } from './album/entities/album.entity';

dotenv.config();

export default {
  type: 'postgres',
  host: process.env.POSTGRES_HOST as string,
  port: parseInt(process.env.POSTGRES_PORT as string, 10) as number,
  username: process.env.POSTGRES_USER as string,
  password: process.env.POSTGRES_PASSWORD as string,
  database: process.env.POSTGRES_DATABASE as string,
  synchronize: false,
  entities: [
    UserEntity,
    AlbumEntity,
    ArtistEntity,
    FavoritesEntity,
    TrackEntity,
  ],
  migrations: [],
  migrationRun: true,
} as DataSourceOptions;
