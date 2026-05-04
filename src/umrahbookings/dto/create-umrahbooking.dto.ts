import { ApiProperty } from "@nestjs/swagger";
import { Umrah } from "src/umrah/entities/umrah.entity";
import { User } from "src/user/entities/user.entity";

export class CreateUmrahbookingDto {
    @ApiProperty()
    packageSelected: { packageName: string; price: number }[];

    @ApiProperty()
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

   

    @ApiProperty()
    totalPrice: number;


    @ApiProperty()
    umrahPurchased: Umrah;

    user: User
}
