import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sessions')
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'session_id', type: 'bigint', nullable: true })
  sessionId?: string;

  @Column({ name: 'user_id', type: 'int', nullable: true })
  userId?: number;
}
