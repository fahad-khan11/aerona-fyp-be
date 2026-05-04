import { ApiProperty } from "@nestjs/swagger";
import { IsDate, isDate } from "class-validator";
import { User } from "src/user/entities/user.entity";

export class CreateHotelInvoiceDto {

    
    @ApiProperty()
    startDate: Date;

    
    @ApiProperty()
    endDate: Date;

    @ApiProperty()
    vendorId: number


    invoiceFor: User;


    totalsales: number


    onlineRecieved: number


    hotelRecieved: number


    aeronaaComission: number

    amountToBePaid:number


    vendorNet: number

    toBePaidBY: string


    isPaidByAeronaa?: boolean


    isPaidByVendor?: boolean


    paidByAeronaaDate?: Date


    paidByVendorDate?: Date
}
