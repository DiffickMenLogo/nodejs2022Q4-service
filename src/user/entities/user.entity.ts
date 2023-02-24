import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  version: number;

  @Column({ nullable: true })
  createdAt: number;

  @Column({ nullable: true })
  updatedAt: number;

  toResponse() {
    const { id, login, version, createdAt, updatedAt } = this;
    return { id, login, version, createdAt, updatedAt };
  }
}
