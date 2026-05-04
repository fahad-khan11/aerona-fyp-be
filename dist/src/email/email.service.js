"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const decorators_1 = require("@nestjs/common/decorators");
const sgMail = require("@sendgrid/mail");
const ejs = require("ejs");
const path = require("path");
const twilio = require("twilio");
let EmailService = class EmailService {
    constructor() {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        this.twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    }
    async sendMail(sendMailDto, verificationCode) {
        const templatePath = path.resolve(process.cwd(), 'src', 'email', 'tempelate', 'email-tempelate.ejs');
        console.log("Template path =", templatePath);
        const htmlContent = await ejs.renderFile(templatePath, {
            subject: sendMailDto.subject,
            message: sendMailDto.text,
            year: new Date().getFullYear(),
            verificationCode: verificationCode
        });
        const msg = {
            to: sendMailDto.to,
            from: process.env.SENDGRID_SENDER_EMAIL,
            subject: sendMailDto.subject,
            text: sendMailDto.text,
            html: htmlContent,
            verificationCode: verificationCode
        };
        try {
            const result = await sgMail.send(msg);
            return { message: 'Email sent successfully' };
        }
        catch (error) {
            console.error('SendGrid Error:', error);
            throw new Error('Failed to send email');
        }
    }
    async sendHotelBookingMail(sendMailDto, bookingId, hotelName, checkInDate, checkOutDate, roomType, numberOfNights, price, guestName) {
        console.log('hotel name ', hotelName);
        const templatePath = path.resolve(process.cwd(), 'src', 'email', 'tempelate', 'hotel-booking-confirmation.ejs');
        const htmlContent = await ejs.renderFile(templatePath, {
            subject: sendMailDto.subject,
            message: sendMailDto.text,
            year: new Date().getFullYear(),
            bookingId: bookingId,
            hotelName: hotelName,
            checkInDate: checkInDate,
            checkOutDate: checkOutDate,
            roomType: roomType,
            numberOfNights: numberOfNights,
            totalAmount: price,
            guestName: guestName
        });
        const msg = {
            to: sendMailDto.to,
            from: process.env.SENDGRID_SENDER_EMAIL,
            subject: sendMailDto.subject,
            text: sendMailDto.text,
            html: htmlContent,
        };
        try {
            const result = await sgMail.send(msg);
            return { message: 'Email sent successfully' };
        }
        catch (error) {
            console.error('SendGrid Error:', error);
            throw new Error('Failed to send email');
        }
    }
    async sendHotelBookingMailAdmin(sendMailDto, bookingId, hotelName, checkInDate, checkOutDate, roomType, numberOfNights, price, guestName) {
        const templatePath = path.resolve(process.cwd(), 'src', 'email', 'tempelate', 'hotel-booking-confirmation-admin.ejs');
        const htmlContent = await ejs.renderFile(templatePath, {
            subject: sendMailDto.subject,
            message: sendMailDto.text,
            year: new Date().getFullYear(),
            bookingId: bookingId,
            hotelName: hotelName,
            checkInDate: checkInDate,
            checkOutDate: checkOutDate,
            roomType: roomType,
            numberOfNights: numberOfNights,
            totalAmount: price,
            guestName: guestName
        });
        const msg = {
            to: sendMailDto.to,
            from: process.env.SENDGRID_SENDER_EMAIL,
            subject: sendMailDto.subject,
            text: sendMailDto.text,
            html: htmlContent,
        };
        try {
            const result = await sgMail.send(msg);
            return { message: 'Email sent successfully' };
        }
        catch (error) {
            console.error('SendGrid Error:', error);
            throw new Error('Failed to send email');
        }
    }
    async sendSms(to, body) {
        try {
            const result = await this.twilioClient.messages.create({
                body,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: to,
            });
            return { message: 'SMS sent successfully', sid: result.sid };
        }
        catch (error) {
            console.error('Twilio Error:', error);
            throw new Error('Failed to send SMS');
        }
    }
    async flightConfirmationMail(sendMailDto, pdf) {
        const templatePath = path.resolve(process.cwd(), 'src', 'email', 'tempelate', 'flight-booking-confirmation.ejs');
        const htmlContent = await ejs.renderFile(templatePath, {
            subject: sendMailDto.subject,
            message: sendMailDto.text,
            pdfUrl: pdf
        });
        const msg = {
            to: sendMailDto.to,
            from: process.env.SENDGRID_SENDER_EMAIL,
            subject: sendMailDto.subject,
            text: sendMailDto.text,
            html: htmlContent,
        };
        try {
            const result = await sgMail.send(msg);
            return { message: 'Email sent successfully' };
        }
        catch (error) {
            console.error('SendGrid Error:', error);
            throw new Error('Failed to send email');
        }
    }
    async sendHotelBookingConfirmation(bookingData) {
        const templatePath = path.resolve(process.cwd(), 'src', 'email', 'tempelate', 'hotel-booking-confirmation.ejs');
        const htmlContent = await ejs.renderFile(templatePath, Object.assign(Object.assign({}, bookingData), { year: new Date().getFullYear() }));
        const msg = {
            to: bookingData.to,
            from: process.env.SENDGRID_SENDER_EMAIL,
            subject: `Hotel Booking Confirmed - ${bookingData.hotelName}`,
            html: htmlContent,
        };
        try {
            const result = await sgMail.send(msg);
            return { message: 'Hotel booking confirmation email sent successfully', result };
        }
        catch (error) {
            console.error('SendGrid Error:', error);
            throw new Error('Failed to send hotel booking confirmation email');
        }
    }
    async sendFlightBookingConfirmation(bookingData) {
        const templatePath = path.resolve(process.cwd(), 'src', 'email', 'tempelate', 'flight-booking-confirmation.ejs');
        const htmlContent = await ejs.renderFile(templatePath, Object.assign(Object.assign({}, bookingData), { year: new Date().getFullYear() }));
        const msg = {
            to: bookingData.to,
            from: process.env.SENDGRID_SENDER_EMAIL,
            subject: `Flight Booking Confirmed - PNR: ${bookingData.pnrNumber}`,
            html: htmlContent,
        };
        try {
            const result = await sgMail.send(msg);
            return { message: 'Flight booking confirmation email sent successfully', result };
        }
        catch (error) {
            console.error('SendGrid Error:', error);
            throw new Error('Failed to send flight booking confirmation email');
        }
    }
    async sendCarRentalConfirmation(bookingData) {
        const templatePath = path.resolve(process.cwd(), 'src', 'email', 'tempelate', 'car-rental-confirmation.ejs');
        const htmlContent = await ejs.renderFile(templatePath, Object.assign(Object.assign({}, bookingData), { year: new Date().getFullYear() }));
        const msg = {
            to: bookingData.to,
            from: process.env.SENDGRID_SENDER_EMAIL,
            subject: `Car Rental Confirmed - ${bookingData.carModel}`,
            html: htmlContent,
        };
        try {
            const result = await sgMail.send(msg);
            return { message: 'Car rental confirmation email sent successfully', result };
        }
        catch (error) {
            console.error('SendGrid Error:', error);
            throw new Error('Failed to send car rental confirmation email');
        }
    }
    findAll() {
        return `This action returns all email`;
    }
    findOne(id) {
        return `This action returns a #${id} email`;
    }
    update(id, updateEmailDto) {
        return `This action updates a #${id} email`;
    }
    remove(id) {
        return `This action removes a #${id} email`;
    }
};
EmailService = __decorate([
    (0, decorators_1.Injectable)(),
    __metadata("design:paramtypes", [])
], EmailService);
exports.EmailService = EmailService;
//# sourceMappingURL=email.service.js.map