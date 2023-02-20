import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('favorites')
export class FavoritesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string; //create this because pg cant start without primary key

  @Column()
  artist: string;

  @Column()
  album: string;

  @Column()
  track: string;

  toResponse() {
    const { artist, album, track } = this;
    return { artist, album, track };
  }
}
