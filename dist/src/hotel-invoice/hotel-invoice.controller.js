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
exports.HotelInvoiceController = void 0;
const common_1 = require("@nestjs/common");
const hotel_invoice_service_1 = require("./hotel-invoice.service");
const create_hotel_invoice_dto_1 = require("./dto/create-hotel-invoice.dto");
const update_hotel_invoice_dto_1 = require("./dto/update-hotel-invoice.dto");
const bookings_service_1 = require("../bookings/bookings.service");
let HotelInvoiceController = class HotelInvoiceController {
    constructor(hotelInvoiceService, bookindService) {
        this.hotelInvoiceService = hotelInvoiceService;
        this.bookindService = bookindService;
    }
    async create(createHotelInvoiceDto) {
        const invoiceExist = await this.hotelInvoiceService.findInvoiceByDate(createHotelInvoiceDto.startDate, createHotelInvoiceDto.endDate, createHotelInvoiceDto.vendorId);
        if (invoiceExist) {
            throw new common_1.BadRequestException('The dates selected are already included in existing invoices');
        }
        const result = await this.bookindService.getInvoiceSum(createHotelInvoiceDto.vendorId, createHotelInvoiceDto.startDate, createHotelInvoiceDto.endDate);
        createHotelInvoiceDto.totalsales = result.total;
        createHotelInvoiceDto.onlineRecieved = result.onlineTotal;
        createHotelInvoiceDto.hotelRecieved = result.payAtHotelTotal;
        if (!createHotelInvoiceDto.totalsales) {
            throw new common_1.BadRequestException('No bookings found for the selected dates');
        }
        if (!createHotelInvoiceDto.onlineRecieved) {
            createHotelInvoiceDto.onlineRecieved = 0;
        }
        if (!createHotelInvoiceDto.hotelRecieved) {
            createHotelInvoiceDto.hotelRecieved = 0;
        }
        createHotelInvoiceDto.aeronaaComission = Math.floor(0.03 * createHotelInvoiceDto.totalsales);
        createHotelInvoiceDto.vendorNet = createHotelInvoiceDto.totalsales - createHotelInvoiceDto.aeronaaComission;
        if (createHotelInvoiceDto.aeronaaComission > createHotelInvoiceDto.onlineRecieved) {
            createHotelInvoiceDto.toBePaidBY = 'vendor';
            createHotelInvoiceDto.amountToBePaid = createHotelInvoiceDto.aeronaaComission - createHotelInvoiceDto.onlineRecieved;
        }
        if (createHotelInvoiceDto.aeronaaComission < createHotelInvoiceDto.onlineRecieved) {
            createHotelInvoiceDto.toBePaidBY = 'aeronaa';
            createHotelInvoiceDto.amountToBePaid = createHotelInvoiceDto.onlineRecieved - createHotelInvoiceDto.aeronaaComission;
        }
        if (createHotelInvoiceDto.aeronaaComission == createHotelInvoiceDto.onlineRecieved) {
            createHotelInvoiceDto.toBePaidBY = 'none';
            createHotelInvoiceDto.amountToBePaid = 0;
        }
        return this.hotelInvoiceService.create(createHotelInvoiceDto);
    }
    findAll() {
        return this.hotelInvoiceService.findAll();
    }
    findOne(id) {
        return this.hotelInvoiceService.findOne(+id);
    }
    update(id, updateHotelInvoiceDto) {
        return this.hotelInvoiceService.update(+id, updateHotelInvoiceDto);
    }
    remove(id) {
        return this.hotelInvoiceService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_hotel_invoice_dto_1.CreateHotelInvoiceDto]),
    __metadata("design:returntype", Promise)
], HotelInvoiceController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HotelInvoiceController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HotelInvoiceController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_hotel_invoice_dto_1.UpdateHotelInvoiceDto]),
    __metadata("design:returntype", void 0)
], HotelInvoiceController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HotelInvoiceController.prototype, "remove", null);
HotelInvoiceController = __decorate([
    (0, common_1.Controller)('hotel-invoice'),
    __metadata("design:paramtypes", [hotel_invoice_service_1.HotelInvoiceService,
        bookings_service_1.BookingsService])
], HotelInvoiceController);
exports.HotelInvoiceController = HotelInvoiceController;
//# sourceMappingURL=hotel-invoice.controller.js.map