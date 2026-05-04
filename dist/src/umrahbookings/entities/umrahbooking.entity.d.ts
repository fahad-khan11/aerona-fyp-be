import { BaseEntity } from "base.entity";
import { Umrah } from "src/umrah/entities/umrah.entity";
import { User } from "src/user/entities/user.entity";
export declare class Umrahbooking extends BaseEntity {
    packageSelected: {
        packageName: string;
        price: number;
    }[];
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
    totalPrice: number;
    umrahPurchased: Umrah;
    user: User;
}
