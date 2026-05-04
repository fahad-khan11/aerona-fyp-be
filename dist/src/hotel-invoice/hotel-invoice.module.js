"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelInvoiceModule = void 0;
const common_1 = require("@nestjs/common");
const hotel_invoice_service_1 = require("./hotel-invoice.service");
const hotel_invoice_controller_1 = require("./hotel-invoice.controller");
const typeorm_1 = require("@nestjs/typeorm");
const hotel_invoice_entity_1 = require("./entities/hotel-invoice.entity");
const bookings_module_1 = require("../bookings/bookings.module");
let HotelInvoiceModule = class HotelInvoiceModule {
};
HotelInvoiceModule = __decorate([
    (0, common_1.Module)({
        controllers: [hotel_invoice_controller_1.HotelInvoiceController],
        providers: [hotel_invoice_service_1.HotelInvoiceService],
        imports: [typeorm_1.TypeOrmModule.forFeature([hotel_invoice_entity_1.HotelInvoice]), bookings_module_1.BookingsModule],
    })
], HotelInvoiceModule);
exports.HotelInvoiceModule = HotelInvoiceModule;
//# sourceMappingURL=hotel-invoice.module.js.map