import { BaseEntity } from "base.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity('invoice')
export class Invoice extends BaseEntity{
    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @Column({
        nullable:true
    }
        
    )
    vendorId:number

    @ManyToOne(() => User,{onDelete:'CASCADE'})
    @JoinColumn({
        name:'vendorId'
    })
    invoiceFor: User;

    @Column()
    totalsales:number

    @Column()
    aeronaaComission:number

    @Column()
    vendorNet:number

    @Column({
        default:false
    })
    isPaid:boolean

    @Column({nullable:true})
    paidAt:Date

    @Column({nullable:true,default:false})
    isFlightBooking:boolean
    

}
