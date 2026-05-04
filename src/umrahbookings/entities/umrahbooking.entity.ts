import { BaseEntity } from "base.entity";
import { Umrah } from "src/umrah/entities/umrah.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity('umrahbookings')
export class Umrahbooking extends BaseEntity {
    @Column({ type: 'jsonb', nullable: true })
    packageSelected: { packageName: string; price: number }[];

    @Column({ type: 'jsonb', nullable: true })
    traveller: {
        firstName: string;
        lastName?: string;
        emailAddress?: string;
        phoneNumber?: string;
        gender?: string;
        dateOfBirth?: Date;
        nationality?: string;
        passportNumber?: string;
        passportExpiryDate?: Date;
        specialRequests?: string;



    }[];

    @Column()
    totalPrice: number;


    @ManyToOne(() => Umrah, { onDelete: 'CASCADE' })
    @JoinColumn()
    umrahPurchased: Umrah;

      @ManyToOne(() => User, { onDelete: 'CASCADE' })
      @JoinColumn()
      user: User;

}
