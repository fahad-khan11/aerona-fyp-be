import { Hotel } from "src/hotels/entities/hotel.entity";
import { RoomType } from "../entities/room.entity";
export declare class CreateRoomDto {
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
}
