import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('semester_comments')
export class SemesterComment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id', type: 'int', nullable: true })
  userId?: number;

  @Column({ length: 255, nullable: true })
  username?: string;

  @Column({ name: 'semester_id', type: 'int', nullable: true })
  semesterId?: number;

  @Column({ type: 'text', nullable: true })
  article?: string;

  @Column({ name: 'create_at', type: 'datetime', nullable: true })
  createAt?: Date;
}
