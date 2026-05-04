import { BaseEntity } from "base.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity('hotelinvoice')
export class HotelInvoice extends BaseEntity{
    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @Column()
    vendorId:number

    @ManyToOne(() => User,{onDelete:'CASCADE'})
    @JoinColumn({
        name:'vendorId'
    })
    invoiceFor: User;

    @Column()
    totalsales:number

    @Column()
    onlineRecieved:number

    @Column()
    hotelRecieved:number

    @Column()
    aeronaaComission:number

    @Column()
    vendorNet:number

    @Column({
        nullable:true
    })
    isPaidByAeronaa:boolean

     @Column({
        nullable:true
    })
    isPaidByVendor:boolean

    @Column({nullable:true})
    paidByAeronaaDate:Date

    @Column({nullable:true})
    paidByVendorDate:Date

    @Column()
    toBePaidBY:string

    @Column()
    amountToBePaid:number

    

}
