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

  @Column({ length: 255, nullable: true })
  username?: string;

  @Column({ name: 'photo_id', type: 'int', nullable: true })
  photoId?: number;

  @Column({
    name: 'src_json',
    type: 'longtext',
    nullable: true,
    transformer: {
      to: (value?: unknown) => {
        if (value === undefined || value === null) {
          return null;
        }
        if (typeof value === 'string') {
          return value;
        }
        return JSON.stringify(value);
      },
      from: (value?: string) => {
        if (!value) {
          return null;
        }
        try {
          return JSON.parse(value);
        } catch {
          return value;
        }
      },
    },
  })
  src?: unknown;
}
