import { Status, User } from 'src/user/entities/user.entity';
export declare class CreateHotelDto {
    name: string;
    description: string;
    starRating: string;
    Address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    checkInTime: string;
    checkOutTime: string;
    availableFrom: Date;
    availableTo: Date;
    amenities: string[];
    images?: string[];
    tags: string[];
    isCompleted?: number;
    user: User;
    dataByApi: boolean;
    apiId?: string;
    averagePrice: string;
    status: Status;
}
