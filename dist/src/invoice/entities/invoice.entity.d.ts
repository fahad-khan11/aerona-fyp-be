import { BaseEntity } from "base.entity";
import { User } from "src/user/entities/user.entity";
export declare class Invoice extends BaseEntity {
    startDate: Date;
    endDate: Date;
    vendorId: number;
    invoiceFor: User;
    totalsales: number;
    aeronaaComission: number;
    vendorNet: number;
    isPaid: boolean;
    paidAt: Date;
    isFlightBooking: boolean;
}
