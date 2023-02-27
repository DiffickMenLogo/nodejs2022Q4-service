import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('favorites')
export class FavoritesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string; //create this because pg cant start without primary key

  @Column({ nullable: true })
  artist: string;

  @Column({ nullable: true })
  album: string;

  @Column({ nullable: true })
  track: string;

  toResponse() {
    const { artist, album, track } = this;
    return { artist, album, track };
  }
}
