import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('post_comments')
export class PostComment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id', type: 'int', nullable: true })
  userId?: number;

  @Column({ length: 255, nullable: true })
  username?: string;

  @Column({ name: 'post_id', type: 'int', nullable: true })
  postId?: number;

  @Column({ type: 'text', nullable: true })
  article?: string;

  @Column({ name: 'create_at', type: 'datetime', nullable: true })
  createAt?: Date;
}
