import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('posts')
export class Post {
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

  @Column({ name: 'src_json', type: 'longtext', nullable: true })
  srcJson?: string;
}
