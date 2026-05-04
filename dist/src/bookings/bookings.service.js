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
exports.BookingsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const booking_entity_1 = require("./entities/booking.entity");
const typeorm_2 = require("typeorm");
const favourites_entity_1 = require("./entities/favourites.entity");
let BookingsService = class BookingsService {
    constructor(bookingRepository, favouritesRepository) {
        this.bookingRepository = bookingRepository;
        this.favouritesRepository = favouritesRepository;
    }
    create(createBookingDto) {
        return this.bookingRepository.save(createBookingDto);
    }
    createFavourite(createFavouriteDto) {
        return this.favouritesRepository.save(createFavouriteDto);
    }
    removeFavourite(id) {
        return this.favouritesRepository.delete(id);
    }
    findFavourite(userId, hotelId) {
        return this.favouritesRepository.find({
            where: {
                user: { id: userId },
                hotel: { id: hotelId },
            },
        });
    }
    findUserFavourites(id) {
        return this.favouritesRepository.find({
            where: { user: { id } },
            relations: ['hotel'],
            order: {
                createdAt: 'DESC',
            },
        });
    }
    findAll(paymnetType) {
        return this.bookingRepository.find({
            relations: ['hotel', 'user', 'room'],
            order: {
                createdAt: 'DESC',
            },
        });
    }
    findUpComing(id) {
        return this.bookingRepository.find({
            where: {
                user: { id: id },
                checkIndate: (0, typeorm_2.MoreThan)(new Date(Date.now() - 86400000)),
                isActive: true,
            },
            relations: ['hotel', 'room'],
            order: {
                createdAt: 'DESC',
            },
        });
    }
    findPast(id) {
        return this.bookingRepository.find({
            where: {
                user: { id: id },
                checkIndate: (0, typeorm_2.LessThan)(new Date(Date.now() - 86400000)),
                isActive: true,
            },
            relations: ['hotel', 'room'],
            order: {
                createdAt: 'DESC',
            },
        });
    }
    findCancelled(id) {
        return this.bookingRepository.find({
            where: {
                user: { id: id },
                isActive: false,
            },
            relations: ['hotel', 'room'],
            order: {
                createdAt: 'DESC',
            },
        });
    }
    findHotelBookings(hotelId) {
        return this.bookingRepository.find({
            where: { hotel: { id: hotelId } },
            relations: ['hotel', 'user', 'room'],
            order: {
                createdAt: 'DESC',
            },
        });
    }
    findUserBookings(id) {
        return this.bookingRepository.find({
            where: { user: { id } },
            relations: ['hotel', 'user', 'room'],
        });
    }
    async findAllVendorDashBoardStats(id) {
        const totalBookings = await this.bookingRepository.count({
            where: {
                hotel: {
                    user: {
                        id
                    }
                }
            }
        });
        const cancelledBookings = await this.bookingRepository.count({
            where: {
                hotel: {
                    user: {
                        id
                    }
                },
                isActive: false
            }
        });
        return { totalBookings: totalBookings, cancelledBookings: cancelledBookings };
    }
    findOne(id) {
        return this.bookingRepository.findOne({ where: { id: id }, relations: ['hotel', 'hotel.user', 'user'] });
    }
    update(id, updateBookingDto) {
        return this.bookingRepository.update(id, updateBookingDto);
    }
    remove(id) {
        return this.bookingRepository.delete(id);
    }
    async getVendorPayments(hotelId, startDate, endDate) {
        const bookings = await this.bookingRepository.find({
            where: { hotel: { id: hotelId }, checkIndate: (0, typeorm_2.Between)(startDate, endDate) }
        });
        const totalAmount = bookings.reduce((acc, booking) => acc + booking.amount, 0);
        return {
            startDate: startDate,
            endDate: endDate,
            totalAmount: totalAmount,
        };
    }
    async getVendorPaymentsDetails(hotelId, startDate, endDate) {
        const bookings = await this.bookingRepository.find({
            where: { hotel: { id: hotelId }, checkIndate: (0, typeorm_2.Between)(startDate, endDate) },
            relations: ['user']
        });
        return bookings;
    }
    async findTotalBookings() {
        const totalAmount = await this.bookingRepository
            .createQueryBuilder('booking')
            .select('SUM(booking.amount)', 'totalAmount')
            .where('booking.isActive = :isActive', { isActive: true })
            .getRawOne();
        const totalBookings = await this.bookingRepository.count({
            where: {
                isActive: true
            }
        });
        return {
            totalAmount: totalAmount,
            totalBookings: totalBookings
        };
    }
    async hotelInvoiceAdmin() {
        const totalPayments = await this.bookingRepository
            .createQueryBuilder("booking")
            .select(`SUM(CASE WHEN booking.paymentType = 'online' THEN booking.amount ELSE 0 END)`, "onlineTotal")
            .addSelect(`SUM(CASE WHEN booking.paymentType = 'payathotel' THEN booking.amount ELSE 0 END)`, "payAtHotelTotal")
            .addSelect("SUM(booking.amount)", "total")
            .where('booking.isActive = :isActive', { isActive: true })
            .getRawOne();
        const monthWiseTotals = await this.bookingRepository
            .createQueryBuilder("booking")
            .select("TO_CHAR(booking.createdAt, 'YYYY-MM')", "month")
            .addSelect(`SUM(CASE WHEN booking.paymentType = 'online' THEN booking.amount ELSE 0 END)`, "onlineTotal")
            .addSelect(`SUM(CASE WHEN booking.paymentType = 'payathotel' THEN booking.amount ELSE 0 END)`, "payAtHotelTotal")
            .addSelect("SUM(booking.amount)", "total")
            .where('booking.isActive = :isActive', { isActive: true })
            .groupBy("month")
            .orderBy("month", "ASC")
            .getRawMany();
        const vendorTotals = await this.bookingRepository
            .createQueryBuilder("booking")
            .leftJoin("booking.hotel", "hotel")
            .leftJoin("hotel.user", "vendor")
            .select("vendor.id", "vendorId")
            .addSelect("vendor.name", "vendorName")
            .addSelect(`SUM(CASE WHEN booking.paymentType = 'online' THEN booking.amount ELSE 0 END)`, "onlineTotal")
            .addSelect(`SUM(CASE WHEN booking.paymentType = 'payathotel' THEN booking.amount ELSE 0 END)`, "payAtHotelTotal")
            .addSelect("SUM(booking.amount)", "total")
            .where('booking.isActive = :isActive', { isActive: true })
            .groupBy("vendor.id")
            .addGroupBy("vendor.name")
            .orderBy("total", "DESC")
            .getRawMany();
        const monthWiseVendorTotals = await this.bookingRepository
            .createQueryBuilder("booking")
            .leftJoin("booking.hotel", "hotel")
            .leftJoin("hotel.user", "vendor")
            .select("vendor.id", "vendorId")
            .addSelect("vendor.name", "vendorName")
            .addSelect("TO_CHAR(booking.createdAt, 'YYYY-MM')", "month")
            .addSelect(`SUM(CASE WHEN booking.paymentType = 'online' THEN booking.amount ELSE 0 END)`, "onlineTotal")
            .addSelect(`SUM(CASE WHEN booking.paymentType = 'payathotel' THEN booking.amount ELSE 0 END)`, "payAtHotelTotal")
            .addSelect("SUM(booking.amount)", "total")
            .where('booking.isActive = :isActive', { isActive: true })
            .groupBy("vendor.id")
            .addGroupBy("vendor.name")
            .addGroupBy("month")
            .orderBy("vendor.id", "ASC")
            .addOrderBy("month", "ASC")
            .getRawMany();
        return {
            totalPayments,
            monthWiseTotals,
            vendorTotals,
            monthWiseVendorTotals,
        };
    }
    async findVendorInvoice(monthYear, vendorId) {
        const result = await this.bookingRepository
            .createQueryBuilder("booking")
            .leftJoin("booking.hotel", "hotel")
            .leftJoin("hotel.user", "vendor")
            .select("vendor.id", "vendorId")
            .addSelect("vendor.name", "vendorName")
            .addSelect(`SUM(CASE WHEN booking.paymentType = 'online' THEN booking.amount ELSE 0 END)`, "onlineTotal")
            .addSelect(`SUM(CASE WHEN booking.paymentType = 'payathotel' THEN booking.amount ELSE 0 END)`, "payAtHotelTotal")
            .addSelect("SUM(booking.amount)", "total")
            .where("TO_CHAR(booking.createdAt, 'YYYY-MM') = :monthYear", { monthYear })
            .andWhere("vendor.id = :vendorId", { vendorId })
            .andWhere('booking.isActive = :isActive', { isActive: true })
            .groupBy("vendor.id")
            .addGroupBy("vendor.name")
            .getRawMany();
        return result;
    }
    async findMonthWiseRevenue() {
        const bookings = await this.bookingRepository
            .createQueryBuilder('booking')
            .select("TO_CHAR(DATE_TRUNC('month', booking.checkIndate), 'YYYY-MM')", 'month')
            .addSelect('SUM(booking.amount)', 'totalAmount')
            .where('booking.isActive = :isActive', { isActive: true })
            .groupBy("DATE_TRUNC('month', booking.checkIndate)")
            .orderBy('month', 'ASC')
            .getRawMany();
        return bookings;
    }
    async findMonthBookingsForVendor(vendorId, monthYear) {
        const [year, month] = monthYear.split('-').map(Number);
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0, 23, 59, 59);
        return this.bookingRepository.find({
            where: {
                checkIndate: (0, typeorm_2.Between)(startDate, endDate),
                hotel: {
                    user: {
                        id: vendorId
                    }
                },
            }
        });
    }
    async findMonthAgentComission(userId) {
        return this.bookingRepository
            .createQueryBuilder('booking')
            .select([
            `TO_CHAR(booking.checkIndate, 'YYYY-MM') AS month`,
            `SUM(booking.amount)::float AS totalAmount`,
            `COUNT(booking.id)::int AS totalBookings`,
        ])
            .where('booking.userId = :userId', { userId })
            .groupBy('month')
            .orderBy('month', 'ASC')
            .getRawMany();
    }
    async getInvoiceSum(vendorId, startDate, endDate) {
        const total = await this.bookingRepository.sum('amount', {
            checkIndate: (0, typeorm_2.Between)(startDate, endDate),
            hotel: {
                user: {
                    id: vendorId
                }
            }
        });
        const onlineTotal = await this.bookingRepository.sum('amount', {
            checkIndate: (0, typeorm_2.Between)(startDate, endDate),
            paymentType: booking_entity_1.PaymentType.ONLINE,
            hotel: {
                user: {
                    id: vendorId
                }
            }
        });
        const payAtHotelTotal = await this.bookingRepository.sum('amount', {
            checkIndate: (0, typeorm_2.Between)(startDate, endDate),
            paymentType: booking_entity_1.PaymentType.PAYATHOTEL,
            hotel: {
                user: {
                    id: vendorId
                }
            }
        });
        return {
            total,
            onlineTotal,
            payAtHotelTotal
        };
    }
};
BookingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(booking_entity_1.Booking)),
    __param(1, (0, typeorm_1.InjectRepository)(favourites_entity_1.Favourites)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], BookingsService);
exports.BookingsService = BookingsService;
//# sourceMappingURL=bookings.service.js.map