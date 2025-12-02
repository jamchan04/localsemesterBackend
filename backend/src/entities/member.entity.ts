import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('members')
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  article?: string;

  @Column({ name: 'user_id', type: 'int', nullable: true })
  userId?: number;
}
