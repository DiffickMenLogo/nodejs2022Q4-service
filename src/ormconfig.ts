import { TrackEntity } from './track/entities/track.entity';
import { FavoritesEntity } from './favorites/entities/favorites.entity';
import { ArtistEntity } from './artist/entities/artist.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { AlbumEntity } from './album/entities/album.entity';
import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST as string,
  port: parseInt(process.env.POSTGRES_PORT as string, 10) as number,
  username: process.env.POSTGRES_USER as string,
  password: process.env.POSTGRES_PASSWORD as string,
  database: process.env.POSTGRES_DATABASE as string,
  synchronize: false,
  entities: ['dist/**/entities/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  migrationsRun: true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
