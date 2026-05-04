import { Role } from "src/user/entities/user.entity";
export declare class CreateInvoiceDto {
    startDate: Date;
    endDate: Date;
    vendorId?: number;
    totalsales?: number;
    aeronaaComission?: number;
    vendorNet?: number;
    isPaid?: boolean;
    isFlightBooking?: boolean;
    paidAt?: Date;
    role?: Role;
}
