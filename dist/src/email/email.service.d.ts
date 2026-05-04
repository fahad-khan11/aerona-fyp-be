import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import * as sgMail from '@sendgrid/mail';
export declare class EmailService {
    private twilioClient;
    constructor();
    sendMail(sendMailDto: CreateEmailDto, verificationCode: string): Promise<{
        message: string;
    }>;
    sendHotelBookingMail(sendMailDto: CreateEmailDto, bookingId: string, hotelName: string, checkInDate: string, checkOutDate: string, roomType: string, numberOfNights: number, price: number, guestName?: string): Promise<{
        message: string;
    }>;
    sendHotelBookingMailAdmin(sendMailDto: CreateEmailDto, bookingId: string, hotelName: string, checkInDate: string, checkOutDate: string, roomType: string, numberOfNights: number, price: number, guestName?: string): Promise<{
        message: string;
    }>;
    sendSms(to: string, body: string): Promise<{
        message: string;
        sid: string;
    }>;
    flightConfirmationMail(sendMailDto: CreateEmailDto, pdf: string): Promise<{
        message: string;
    }>;
    sendHotelBookingConfirmation(bookingData: any): Promise<{
        message: string;
        result: [sgMail.ClientResponse, {}];
    }>;
    sendFlightBookingConfirmation(bookingData: any): Promise<{
        message: string;
        result: [sgMail.ClientResponse, {}];
    }>;
    sendCarRentalConfirmation(bookingData: any): Promise<{
        message: string;
        result: [sgMail.ClientResponse, {}];
    }>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateEmailDto: UpdateEmailDto): string;
    remove(id: number): string;
}
