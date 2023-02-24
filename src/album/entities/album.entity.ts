import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('album')
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  artistId: string;

  @Column({ nullable: true })
  year: number;

  toResponse() {
    const { id, name, artistId, year } = this;
    return { id, name, artistId, year };
  }
}
