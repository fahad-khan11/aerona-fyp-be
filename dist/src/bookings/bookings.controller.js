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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingsController = void 0;
const common_1 = require("@nestjs/common");
const bookings_service_1 = require("./bookings.service");
const create_booking_dto_1 = require("./dto/create-booking.dto");
const update_booking_dto_1 = require("./dto/update-booking.dto");
const user_service_1 = require("../user/user.service");
const currentuser_1 = require("../decorator/currentuser");
const guard_1 = require("../auth/guard");
const swagger_1 = require("@nestjs/swagger");
const rooms_service_1 = require("../rooms/rooms.service");
const stripe_service_1 = require("../stripe/stripe.service");
const email_service_1 = require("../email/email.service");
const hotels_service_1 = require("../hotels/hotels.service");
const booking_entity_1 = require("./entities/booking.entity");
const umrahbookings_service_1 = require("../umrahbookings/umrahbookings.service");
const notifications_service_1 = require("../notifications/notifications.service");
let BookingsController = class BookingsController {
    constructor(bookingsService, usersService, roomService, stripeService, emailService, hotelService, umrahBookingService, notificationService) {
        this.bookingsService = bookingsService;
        this.usersService = usersService;
        this.roomService = roomService;
        this.stripeService = stripeService;
        this.emailService = emailService;
        this.hotelService = hotelService;
        this.umrahBookingService = umrahBookingService;
        this.notificationService = notificationService;
    }
    async create(createBookingDto, user) {
        const currentUser = await this.usersService.findOne(user.userId);
        const room = await this.roomService.findByIds(createBookingDto.room);
        const booking = await this.bookingsService.create(Object.assign(Object.assign({}, createBookingDto), { user: currentUser, room: room }));
        const newBooking = await this.bookingsService.findOne(booking.id);
        const notification = await this.notificationService.create({
            text: `you have a new booking with id AER-${newBooking.id} for the hotel ${newBooking.hotel.name} for the date ${newBooking.checkIndate} `,
            link: "",
            seen: false,
            notificationFor: newBooking.hotel.user,
        });
        const notificationForUser = await this.notificationService.create({
            text: `your  booking is confirmed with the booking id AER-${newBooking.id} for the hotel ${newBooking.hotel.name} for the date ${newBooking.checkIndate} `,
            link: "",
            seen: false,
            notificationFor: newBooking.user,
        });
        const mail = await this.emailService.sendHotelBookingMail({
            to: currentUser.email,
            subject: "Hotel Booking confirmation",
            text: "Your booking is confirmed"
        }, booking.id.toString(), newBooking.hotel.name, booking.checkIndate.toString(), booking.checkOutDate.toString(), booking.room[0].roomType, booking.numberOfDays, booking.amount, currentUser.name);
        const adminMail = await this.emailService.sendHotelBookingMailAdmin({
            to: "admin@aeronaa.com",
            subject: "Hotel Booking confirmation",
            text: "You have a new booking confirmed"
        }, booking.id.toString(), newBooking.hotel.name, booking.checkIndate.toString(), booking.checkOutDate.toString(), booking.room[0].roomType, booking.numberOfDays, booking.amount, currentUser.name);
        return booking;
    }
    async createCheckout(body) {
        const session = await this.stripeService.createCheckoutSession({
            amount: body.amount,
            currency: body.currency,
            successUrl: body.successUrl,
            cancelUrl: body.cancelUrl,
            customerEmail: body.email,
            metadata: {
                bookingId: body.bookingId,
            },
        });
        return { url: session.url };
    }
    findAll(paymnetType) {
        return this.bookingsService.findAll(paymnetType);
    }
    findUpComing(user) {
        return this.bookingsService.findUpComing(user.userId);
    }
    findPast(user) {
        return this.bookingsService.findPast(user.userId);
    }
    findCancelled(user) {
        return this.bookingsService.findCancelled(user.userId);
    }
    findAllUserBookings(user) {
        return this.bookingsService.findUserBookings(user.userId);
    }
    async findAllVendorDashBoardStats(user) {
        const hotelscount = await this.hotelService.findVendorHotelsCount(user.userId);
        const bookingCount = await this.bookingsService.findAllVendorDashBoardStats(user.userId);
        return Object.assign(Object.assign({}, hotelscount), bookingCount);
    }
    findAllHotelBookings(id) {
        return this.bookingsService.findHotelBookings(+id);
    }
    findOne(id) {
        return this.bookingsService.findOne(+id);
    }
    update(id, updateBookingDto) {
        return this.bookingsService.update(+id, updateBookingDto);
    }
    remove(id) {
        return this.bookingsService.remove(+id);
    }
    async getVendorPayments(id, startDate, endDate) {
        return this.bookingsService.getVendorPayments(+id, startDate, endDate);
    }
    async getVendorBookingsDetails(id, startDate, endDate) {
        return this.bookingsService.getVendorPaymentsDetails(+id, startDate, endDate);
    }
    async getAdminStats() {
        const totalUsers = await this.usersService.findTotalUsers();
        const bookingStats = await this.bookingsService.findTotalBookings();
        const monthwiseRevenue = await this.bookingsService.findMonthWiseRevenue();
        const umrahBookingStats = await this.umrahBookingService.findTotalBookings();
        return {
            userCount: totalUsers.userCount,
            vendorCount: totalUsers.vendorCount,
            totalBookings: bookingStats.totalBookings + umrahBookingStats.totalBookings,
            totalAmount: Number(bookingStats.totalAmount.totalAmount) + Number(umrahBookingStats.totalAmount.totalAmount),
            monthRevenue: monthwiseRevenue,
            umrahbookings: umrahBookingStats.totalBookings,
            hotelBookings: bookingStats.totalBookings,
        };
    }
    async getAgentBookings(id) {
        return this.bookingsService.findUserBookings(+id);
    }
    async getMonthBookings(id, month) {
        return this.bookingsService.findMonthBookingsForVendor(+id, month);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, currentuser_1.currentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_booking_dto_1.CreateBookingDto, Object]),
    __metadata("design:returntype", Promise)
], BookingsController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('checkout'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BookingsController.prototype, "createCheckout", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BookingsController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtAuthGuard),
    (0, common_1.Get)('/user/upcoming'),
    __param(0, (0, currentuser_1.currentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BookingsController.prototype, "findUpComing", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtAuthGuard),
    (0, common_1.Get)('/user/past'),
    __param(0, (0, currentuser_1.currentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BookingsController.prototype, "findPast", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtAuthGuard),
    (0, common_1.Get)('/user/cancelled'),
    __param(0, (0, currentuser_1.currentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BookingsController.prototype, "findCancelled", null);
__decorate([
    (0, common_1.Get)('/user'),
    (0, common_1.UseGuards)(guard_1.JwtAuthGuard),
    __param(0, (0, currentuser_1.currentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BookingsController.prototype, "findAllUserBookings", null);
__decorate([
    (0, common_1.Get)('/user/dashboard/stats'),
    (0, common_1.UseGuards)(guard_1.JwtAuthGuard),
    __param(0, (0, currentuser_1.currentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BookingsController.prototype, "findAllVendorDashBoardStats", null);
__decorate([
    (0, common_1.Get)('/hotel/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BookingsController.prototype, "findAllHotelBookings", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BookingsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_booking_dto_1.UpdateBookingDto]),
    __metadata("design:returntype", void 0)
], BookingsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BookingsController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('vendor/payments/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Date,
        Date]),
    __metadata("design:returntype", Promise)
], BookingsController.prototype, "getVendorPayments", null);
__decorate([
    (0, common_1.Get)('vendor/bookings/details/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Date,
        Date]),
    __metadata("design:returntype", Promise)
], BookingsController.prototype, "getVendorBookingsDetails", null);
__decorate([
    (0, common_1.Get)('/admin/stats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BookingsController.prototype, "getAdminStats", null);
__decorate([
    (0, common_1.Get)('agent/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookingsController.prototype, "getAgentBookings", null);
__decorate([
    (0, common_1.Get)('/month/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('month')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], BookingsController.prototype, "getMonthBookings", null);
BookingsController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('bookings'),
    (0, common_1.Controller)('bookings'),
    __metadata("design:paramtypes", [bookings_service_1.BookingsService,
        user_service_1.UserService,
        rooms_service_1.RoomsService,
        stripe_service_1.StripeService,
        email_service_1.EmailService,
        hotels_service_1.HotelsService,
        umrahbookings_service_1.UmrahbookingsService,
        notifications_service_1.NotificationsService])
], BookingsController);
exports.BookingsController = BookingsController;
//# sourceMappingURL=bookings.controller.js.map