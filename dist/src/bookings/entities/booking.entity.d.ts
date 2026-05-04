import { BaseEntity } from 'base.entity';
import { Hotel } from 'src/hotels/entities/hotel.entity';
import { Room } from 'src/rooms/entities/room.entity';
import { User } from 'src/user/entities/user.entity';
export declare enum PaymentType {
    PAYATHOTEL = "payathotel",
    ONLINE = "online"
}
export declare class Booking extends BaseEntity {
    checkIndate: Date;
    checkOutDate: Date;
    numberOfDays: number;
    amount: number;
    user: User;
    hotel: Hotel;
    room: Room[];
    paymentType: PaymentType;
    name: string;
    email: string;
    isAppeared: boolean;
    isConfirmed: boolean;
    stripeBookingRefrence: string;
    nicNumber: string;
}
