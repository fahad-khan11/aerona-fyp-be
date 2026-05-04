import { User } from "src/user/entities/user.entity";
export declare class CreateHotelInvoiceDto {
    startDate: Date;
    endDate: Date;
    vendorId: number;
    invoiceFor: User;
    totalsales: number;
    onlineRecieved: number;
    hotelRecieved: number;
    aeronaaComission: number;
    amountToBePaid: number;
    vendorNet: number;
    toBePaidBY: string;
    isPaidByAeronaa?: boolean;
    isPaidByVendor?: boolean;
    paidByAeronaaDate?: Date;
    paidByVendorDate?: Date;
}
