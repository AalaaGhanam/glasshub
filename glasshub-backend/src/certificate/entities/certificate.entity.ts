import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Certificate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  companyName: string;

  @Column('text')
  logo: string;

  @Column('text')
  content: string;

  @Column()
  issueDate: Date;
}
