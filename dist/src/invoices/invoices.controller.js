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
exports.InvoicesController = void 0;
const common_1 = require("@nestjs/common");
const invoices_service_1 = require("./invoices.service");
const create_invoice_dto_1 = require("./dto/create-invoice.dto");
const update_invoice_dto_1 = require("./dto/update-invoice.dto");
const bookings_service_1 = require("../bookings/bookings.service");
const umrahbookings_service_1 = require("../umrahbookings/umrahbookings.service");
let InvoicesController = class InvoicesController {
    constructor(invoicesService, bookingsService, umrahBookingsService) {
        this.invoicesService = invoicesService;
        this.bookingsService = bookingsService;
        this.umrahBookingsService = umrahBookingsService;
    }
    create(createInvoiceDto) {
        return this.invoicesService.create(createInvoiceDto);
    }
    findAll() {
        return this.invoicesService.findAll();
    }
    findAdminHotelInvoice() {
        return this.bookingsService.hotelInvoiceAdmin();
    }
    findAdminUmrahInvoice() {
        return this.umrahBookingsService.hotelInvoiceAdmin();
    }
    findOne(id) {
        return this.invoicesService.findOne(+id);
    }
    async getVendorMonthPayments(vendorId, monthYear) {
        return this.bookingsService.findVendorInvoice(monthYear, vendorId);
    }
    update(id, updateInvoiceDto) {
        return this.invoicesService.update(+id, updateInvoiceDto);
    }
    remove(id) {
        return this.invoicesService.remove(+id);
    }
    async getAgentComission(agentId) {
        return await this.bookingsService.findMonthAgentComission(agentId);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_invoice_dto_1.CreateInvoiceDto]),
    __metadata("design:returntype", void 0)
], InvoicesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InvoicesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/admin/hotels'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InvoicesController.prototype, "findAdminHotelInvoice", null);
__decorate([
    (0, common_1.Get)('/admin/umrah'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InvoicesController.prototype, "findAdminUmrahInvoice", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InvoicesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('vendor/:vendorId/month/:monthYear'),
    __param(0, (0, common_1.Param)('vendorId')),
    __param(1, (0, common_1.Param)('monthYear')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], InvoicesController.prototype, "getVendorMonthPayments", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_invoice_dto_1.UpdateInvoiceDto]),
    __metadata("design:returntype", void 0)
], InvoicesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InvoicesController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('/agent/comission/:agentId'),
    __param(0, (0, common_1.Param)('agentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], InvoicesController.prototype, "getAgentComission", null);
InvoicesController = __decorate([
    (0, common_1.Controller)('invoices'),
    __metadata("design:paramtypes", [invoices_service_1.InvoicesService,
        bookings_service_1.BookingsService,
        umrahbookings_service_1.UmrahbookingsService])
], InvoicesController);
exports.InvoicesController = InvoicesController;
//# sourceMappingURL=invoices.controller.js.map