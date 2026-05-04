import { ApiProperty } from "@nestjs/swagger";
import { IsDate } from "class-validator";
import { Role, User } from "src/user/entities/user.entity";

export class CreateInvoiceDto {

    @ApiProperty()

    startDate: Date;

    @ApiProperty()

    endDate: Date;

    @ApiProperty()
    vendorId?: number


    totalsales?: number


    aeronaaComission?: number


    vendorNet?: number


    isPaid?: boolean

    isFlightBooking?:boolean


    paidAt?: Date
    @ApiProperty()
    role?: Role
}
