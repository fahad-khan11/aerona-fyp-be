import { BaseEntity } from "base.entity";
import { User } from "src/user/entities/user.entity";
export declare class HotelInvoice extends BaseEntity {
    startDate: Date;
    endDate: Date;
    vendorId: number;
    invoiceFor: User;
    totalsales: number;
    onlineRecieved: number;
    hotelRecieved: number;
    aeronaaComission: number;
    vendorNet: number;
    isPaidByAeronaa: boolean;
    isPaidByVendor: boolean;
    paidByAeronaaDate: Date;
    paidByVendorDate: Date;
    toBePaidBY: string;
    amountToBePaid: number;
}
