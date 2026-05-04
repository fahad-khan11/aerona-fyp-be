import { BaseEntity } from 'base.entity';
import { Column, Entity } from 'typeorm';

export enum Status{
  PENDING = 'pending',
  APPROVED = 'approved',
  BLOCKED = 'blocked'
}

@Entity('User')
export class User extends BaseEntity {
  @Column()
  name: string;
  @Column({
    
  })
  password: string;
  @Column()
  email: string;
  @Column()
  phone: string;
  @Column({nullable:true})
  role: Role;

  @Column({default:false,nullable:true })
  isEmailVerified: boolean;

  @Column({nullable:true,default:Status.PENDING})
  status: Status;

  @Column({ nullable: true })
  verificationCode: string;

  @Column('text', { array: true, nullable: true })
  permissions: string[];
}

export enum Role {
 VENDOR='vendor',
 USER='user',
 ADMIN='admin',
 SUPPORT='support',
 CARRENTAL='carrental',
 PROPERTY='property',
 AGENT='agent',
 UMRAH='umrah'
}
