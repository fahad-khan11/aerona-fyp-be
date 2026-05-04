import { BaseEntity } from 'base.entity';
import { Hotel } from 'src/hotels/entities/hotel.entity';
import { Room } from 'src/rooms/entities/room.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne } from 'typeorm';

export enum PaymentType {
  PAYATHOTEL='payathotel',
  ONLINE='online'
}

@Entity('bookings')
export class Booking extends BaseEntity {
  @Column()
  checkIndate: Date;

  @Column()
  checkOutDate: Date;

  @Column()
  numberOfDays: number;

  @Column()
  amount: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Hotel, { onDelete: 'CASCADE' })
  @JoinColumn()
  hotel: Hotel;

 @ManyToMany(() => Room, (room) => room.booking, { onDelete: 'CASCADE' })
  room: Room[];

  @Column({ type: 'enum', enum: PaymentType ,nullable:true})
  paymentType: PaymentType;

  @Column({ nullable: true })
  name:string

  @Column({ nullable: true })
  email:string

  @Column({ nullable: true,default:true })
  isAppeared:boolean

  @Column({nullable: true})
  isConfirmed:boolean

  @Column({nullable: true})
  stripeBookingRefrence:string

  @Column({nullable: true})
  nicNumber:string
  




}
