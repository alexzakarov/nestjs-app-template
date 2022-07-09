import { Role } from 'src/modules/auth/roles/roles.enum';
import { 
  PrimaryGeneratedColumn, 
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity()
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  partnerId: number;
  
  @Column({ 
    type:'enum', 
    enum: Role, 
    default: Role.USER
  })
  role: Role;

  @Column()
  name: string;

  @Column()
  surname: string;
  
  @Column()
  username: string;

  @Column({
    select: false
  })
  password: string;

  @Column()
  phone: string;

  @Column()
  @Index({"unique":true})
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  createdCor: string;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  updatedCor: string;
}