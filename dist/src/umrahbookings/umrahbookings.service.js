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
exports.UmrahbookingsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const umrahbooking_entity_1 = require("./entities/umrahbooking.entity");
let UmrahbookingsService = class UmrahbookingsService {
    constructor(umrahBookingRepository) {
        this.umrahBookingRepository = umrahBookingRepository;
    }
    create(createUmrahbookingDto) {
        return this.umrahBookingRepository.save(createUmrahbookingDto);
    }
    findAll() {
        return this.umrahBookingRepository.find({
            relations: ['umrahPurchased']
        });
    }
    findOne(id) {
        return this.umrahBookingRepository.findOne({
            where: { id: id },
        });
    }
    update(id, updateUmrahbookingDto) {
        return this.umrahBookingRepository.update(id, updateUmrahbookingDto);
    }
    remove(id) {
        return this.umrahBookingRepository.delete(id);
    }
    async findUserBookings(id) {
        return this.umrahBookingRepository.find({
            where: {
                user: {
                    id
                }
            },
            relations: ['umrahPurchased', 'user'],
            order: {
                createdAt: 'DESC'
            }
        });
    }
    async findVendorBookings(id) {
        return this.umrahBookingRepository.find({
            where: {
                umrahPurchased: {
                    createdBy: {
                        id
                    }
                }
            },
            relations: ['umrahPurchased', 'user'],
            order: {
                createdAt: 'DESC'
            }
        });
    }
    async umrahBookingStats(userId) {
        const totalBookings = await this.umrahBookingRepository.count({
            where: {
                umrahPurchased: {
                    createdBy: {
                        id: userId
                    }
                }
            }
        });
        const totalRevenue = await this.umrahBookingRepository.sum('totalPrice', { umrahPurchased: {
                createdBy: {
                    id: userId
                }
            }
        });
        const result = await this.umrahBookingRepository
            .createQueryBuilder('booking').
            leftJoin('booking.umrahPurchased', 'umrah')
            .leftJoin('umrah.createdBy', 'user')
            .select('umrah.packageType', 'packageType')
            .addSelect('COUNT(booking.id)', 'count')
            .where('user.id = :userId', { userId })
            .groupBy('umrah.packageType')
            .getRawMany();
        return {
            totalBookings,
            totalRevenue,
            result
        };
    }
    async hotelInvoiceAdmin() {
        const totalPayments = await this.umrahBookingRepository
            .createQueryBuilder("booking")
            .select(`SUM(booking.totalPrice)`, "Total")
            .getRawOne();
        const monthWiseTotals = await this.umrahBookingRepository
            .createQueryBuilder("booking")
            .select("TO_CHAR(booking.createdAt, 'YYYY-MM')", "month")
            .addSelect("SUM(booking.totalPrice)", "total")
            .groupBy("month")
            .orderBy("month", "ASC")
            .getRawMany();
        const vendorTotals = await this.umrahBookingRepository
            .createQueryBuilder("booking")
            .leftJoin("booking.umrahPurchased", "hotel")
            .leftJoin("hotel.createdBy", "vendor")
            .select("vendor.id", "vendorId")
            .addSelect("vendor.name", "vendorName")
            .addSelect("SUM(booking.totalPrice)", "total")
            .groupBy("vendor.id")
            .addGroupBy("vendor.name")
            .orderBy("total", "DESC")
            .getRawMany();
        const monthWiseVendorTotals = await this.umrahBookingRepository
            .createQueryBuilder("booking")
            .leftJoin("booking.umrahPurchased", "hotel")
            .leftJoin("hotel.createdBy", "vendor")
            .select("vendor.id", "vendorId")
            .addSelect("vendor.name", "vendorName")
            .addSelect("TO_CHAR(booking.createdAt, 'YYYY-MM')", "month")
            .addSelect("SUM(booking.totalPrice)", "total")
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
    async findTotalBookings() {
        const totalAmount = await this.umrahBookingRepository
            .createQueryBuilder('booking')
            .select('SUM(booking.totalPrice)', 'totalAmount')
            .getRawOne();
        const totalBookings = await this.umrahBookingRepository.count();
        return {
            totalAmount: totalAmount,
            totalBookings: totalBookings
        };
    }
    async getInvoiceSum(vendorId, startDate, endDate) {
        return await this.umrahBookingRepository.sum('totalPrice', {
            createdAt: (0, typeorm_2.Between)(startDate, endDate),
            umrahPurchased: {
                createdBy: {
                    id: vendorId
                }
            }
        });
    }
};
UmrahbookingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(umrahbooking_entity_1.Umrahbooking)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UmrahbookingsService);
exports.UmrahbookingsService = UmrahbookingsService;
//# sourceMappingURL=umrahbookings.service.js.map