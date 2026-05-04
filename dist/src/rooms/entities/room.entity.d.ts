import { BaseEntity } from "base.entity";
import { Booking } from "src/bookings/entities/booking.entity";
import { Hotel } from "src/hotels/entities/hotel.entity";
export declare class Room extends BaseEntity {
    roomType: RoomType;
    description: string;
    maxOccupancy: string;
    bedConfiguration: [
        {
            type: string;
            count: string;
        }
    ];
    roomSize: number;
    roomSizeUnit: string;
    basePrice: number;
    discountedPrice?: number;
    amenities?: string[];
    images?: string[];
    quantity: number;
    smokingAllowed: boolean;
    availableUntil?: Date;
    hotel: Hotel;
    booking: Booking;
}
export declare enum RoomType {
    STANDARD = "standard",
    DELUXE = "deluxe",
    SUITE = "suite",
    EXECUTIVE = "executive",
    FAMILY = "family",
    CONNECTING = "connecting"
}
