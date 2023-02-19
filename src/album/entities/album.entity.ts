import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  artistId: string | null;

  @Column()
  year: number;

  toResponse() {
    const { id, name, artistId, year } = this;
    return { id, name, artistId, year };
  }
}
