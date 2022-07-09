import { Role } from 'src/modules/auth/roles/roles.enum';
import { 
  PrimaryGeneratedColumn, 
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  JoinColumn,
  Index
} from 'typeorm';

@Entity()
export class Admins extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  /*
  @OneToMany(type => Partners, partners => partners.admin, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  @JoinColumn({ 
    name: "id", 
    referencedColumnName: "adminId"
  })
  partners: Partners[];
  */
  
  @Column({ 
    type:'enum', 
    enum: Role, 
    default: Role.SUPERADMIN
  })
  role: Role;

  @Column()
  name: string;

  @Column()
  surname: string;
  
  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column()
  @Index({"unique":true})
  email: string;
}