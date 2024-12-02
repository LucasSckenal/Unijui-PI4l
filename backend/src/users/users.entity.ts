import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column({ type: 'text', nullable: true })
  avatar: string | null;
}
