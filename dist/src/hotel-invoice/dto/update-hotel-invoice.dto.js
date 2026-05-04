"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateHotelInvoiceDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_hotel_invoice_dto_1 = require("./create-hotel-invoice.dto");
class UpdateHotelInvoiceDto extends (0, mapped_types_1.PartialType)(create_hotel_invoice_dto_1.CreateHotelInvoiceDto) {
}
exports.UpdateHotelInvoiceDto = UpdateHotelInvoiceDto;
//# sourceMappingURL=update-hotel-invoice.dto.js.map