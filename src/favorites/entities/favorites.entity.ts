import { Column, Entity } from 'typeorm';

@Entity('favorites')
export class FavoritesEntity {
  @Column()
  artists: string[];

  @Column()
  albums: string[];

  @Column()
  tracks: string[];
}
