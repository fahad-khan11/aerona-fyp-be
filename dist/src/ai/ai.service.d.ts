import { Repository } from 'typeorm';
import { Booking } from 'src/bookings/entities/booking.entity';
import { Umrahbooking } from 'src/umrahbookings/entities/umrahbooking.entity';
export declare class AiService {
    private readonly bookingRepository;
    private readonly umrahBookingRepository;
    private genAI;
    private model;
    constructor(bookingRepository: Repository<Booking>, umrahBookingRepository: Repository<Umrahbooking>);
    generateItinerary(userId: number): Promise<any>;
}
