import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sessions')
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'session_id', type: 'bigint' })
  sessionId: number;

  @Column({ name: 'user_id', type: 'int' })
  uid: number;
}
