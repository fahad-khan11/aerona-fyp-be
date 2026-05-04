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
exports.HotelInvoiceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const hotel_invoice_entity_1 = require("./entities/hotel-invoice.entity");
const typeorm_2 = require("typeorm");
let HotelInvoiceService = class HotelInvoiceService {
    constructor(hotelInvoiceRepository) {
        this.hotelInvoiceRepository = hotelInvoiceRepository;
    }
    create(createHotelInvoiceDto) {
        return this.hotelInvoiceRepository.save(createHotelInvoiceDto);
    }
    findAll() {
        return this.hotelInvoiceRepository.find();
    }
    findOne(id) {
        return this.hotelInvoiceRepository.find({
            where: {
                vendorId: id
            },
            order: {
                createdAt: 'DESC'
            }
        });
    }
    update(id, updateHotelInvoiceDto) {
        return this.hotelInvoiceRepository.update(id, updateHotelInvoiceDto);
    }
    remove(id) {
        return this.hotelInvoiceRepository.delete(id);
    }
    async findInvoiceByDate(fromDate, toDate, id) {
        return await this.hotelInvoiceRepository.findOne({
            where: [{
                    startDate: (0, typeorm_2.Between)(fromDate, toDate),
                    vendorId: id
                }, {
                    endDate: (0, typeorm_2.Between)(fromDate, toDate),
                    vendorId: id
                }
            ]
        });
    }
};
HotelInvoiceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(hotel_invoice_entity_1.HotelInvoice)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], HotelInvoiceService);
exports.HotelInvoiceService = HotelInvoiceService;
//# sourceMappingURL=hotel-invoice.service.js.map