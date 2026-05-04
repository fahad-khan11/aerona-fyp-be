import { Hotel } from 'src/hotels/entities/hotel.entity';
import { Room } from 'src/rooms/entities/room.entity';
import { User } from 'src/user/entities/user.entity';
import { PaymentType } from '../entities/booking.entity';
export declare class CreateBookingDto {
    checkIndate: Date;
    checkOutDate: Date;
    numberOfDays: number;
    amount: number;
    user: User;
    room: Room[];
    hotel: Hotel;
    paymentType: PaymentType;
    name?: string;
    email?: string;
    nicNumber?: string;
}
