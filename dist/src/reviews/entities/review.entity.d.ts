import { BaseEntity } from "base.entity";
import { Hotel } from "src/hotels/entities/hotel.entity";
import { User } from "src/user/entities/user.entity";
export declare class Review extends BaseEntity {
    description: string;
    rating: number;
    user: User;
    hotel: Hotel;
}
