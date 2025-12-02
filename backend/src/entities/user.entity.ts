import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: true })
  username?: string;

  @Column({ length: 255, nullable: true, unique: true })
  email?: string;

  @Column({ name: 'user_id', length: 255, nullable: true, unique: true })
  userId?: string;

  @Column({ length: 255, nullable: true })
  password?: string;

  @Column({ type: 'int', nullable: true })
  state?: number;

  @Column({ name: 'create_at', type: 'datetime', nullable: true })
  createAt?: Date;

  @Column({ name: 'photo_id', type: 'int', nullable: true })
  photoId?: number;

  @Column({ type: 'text', nullable: true })
  message?: string;

  @Column({ name: 'profile_photo', type: 'text', nullable: true })
  profilePhoto?: string;
}
