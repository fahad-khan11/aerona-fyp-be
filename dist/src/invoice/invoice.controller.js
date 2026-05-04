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
exports.InvoiceController = void 0;
const common_1 = require("@nestjs/common");
const invoice_service_1 = require("./invoice.service");
const create_invoice_dto_1 = require("./dto/create-invoice.dto");
const update_invoice_dto_1 = require("./dto/update-invoice.dto");
const user_entity_1 = require("../user/entities/user.entity");
const bookings_service_1 = require("../bookings/bookings.service");
const umrahbookings_service_1 = require("../umrahbookings/umrahbookings.service");
const swagger_1 = require("@nestjs/swagger");
let InvoiceController = class InvoiceController {
    constructor(invoiceService, bookingService, umrahBookingService) {
        this.invoiceService = invoiceService;
        this.bookingService = bookingService;
        this.umrahBookingService = umrahBookingService;
    }
    async create(createInvoiceDto) {
        const invoiceExist = await this.invoiceService.findInvoiceByDate(createInvoiceDto.startDate, createInvoiceDto.endDate, createInvoiceDto.vendorId);
        console.log(invoiceExist);
        if (invoiceExist) {
            throw new common_1.BadRequestException('The dates selected are already included in existing invoices');
        }
        if (createInvoiceDto.role == user_entity_1.Role.UMRAH) {
            createInvoiceDto.totalsales = await this.umrahBookingService.getInvoiceSum(createInvoiceDto.vendorId, createInvoiceDto.startDate, createInvoiceDto.endDate);
        }
        createInvoiceDto.aeronaaComission = Math.floor(0.03 * createInvoiceDto.totalsales);
        createInvoiceDto.vendorNet = createInvoiceDto.totalsales - createInvoiceDto.aeronaaComission;
        if (!createInvoiceDto.totalsales) {
            throw new common_1.BadRequestException('No bookings found for the given dates');
        }
        return this.invoiceService.create(createInvoiceDto);
    }
    findAll() {
        return this.invoiceService.findAll();
    }
    findOne(id) {
        return this.invoiceService.findOne(+id);
    }
    update(id, updateInvoiceDto) {
        return this.invoiceService.update(+id, updateInvoiceDto);
    }
    remove(id) {
        return this.invoiceService.remove(+id);
    }
    async getVendorInvoice(id) {
        return this.invoiceService.getVendorInvoice(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_invoice_dto_1.CreateInvoiceDto]),
    __metadata("design:returntype", Promise)
], InvoiceController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InvoiceController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InvoiceController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_invoice_dto_1.UpdateInvoiceDto]),
    __metadata("design:returntype", void 0)
], InvoiceController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InvoiceController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('/vendor/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InvoiceController.prototype, "getVendorInvoice", null);
InvoiceController = __decorate([
    (0, swagger_1.ApiTags)('receipts'),
    (0, common_1.Controller)('invoice'),
    __metadata("design:paramtypes", [invoice_service_1.InvoiceService,
        bookings_service_1.BookingsService,
        umrahbookings_service_1.UmrahbookingsService])
], InvoiceController);
exports.InvoiceController = InvoiceController;
//# sourceMappingURL=invoice.controller.js.map