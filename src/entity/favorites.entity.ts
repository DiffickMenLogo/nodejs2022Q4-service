import { Column, Entity } from 'typeorm';

@Entity()
export class Favorites {
  @Column()
  artists: string[];

  @Column()
  albums: string[];

  @Column()
  tracks: string[];
}
