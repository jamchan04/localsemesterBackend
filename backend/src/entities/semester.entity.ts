import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('semesters')
export class Semester {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  title?: string;

  @Column({ type: 'longtext', nullable: true })
  article?: string;

  @Column({ name: 'create_at', type: 'datetime', nullable: true })
  createAt?: Date;

  @Column({ name: 'user_id', type: 'int', nullable: true })
  userId?: number;

  @Column({ length: 255, nullable: true })
  username?: string;

  @Column({ name: 'photo_id', type: 'int', nullable: true })
  photoId?: number;

  @Column({ name: 'src_json', type: 'longtext', nullable: true })
  srcJson?: string;
}
