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
exports.InvoiceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const invoice_entity_1 = require("./entities/invoice.entity");
let InvoiceService = class InvoiceService {
    constructor(invoiceRepository) {
        this.invoiceRepository = invoiceRepository;
    }
    async create(createInvoiceDto) {
        return this.invoiceRepository.save(createInvoiceDto);
    }
    findAll() {
        return this.invoiceRepository.find();
    }
    findOne(id) {
        return this.invoiceRepository.findOne({
            where: {
                id
            }
        });
    }
    update(id, updateInvoiceDto) {
        return this.invoiceRepository.update(id, updateInvoiceDto);
    }
    remove(id) {
        return this.invoiceRepository.delete(id);
    }
    getVendorInvoice(id) {
        if (id == 0) {
            return this.invoiceRepository.find({
                where: {
                    isFlightBooking: true
                },
                order: {
                    updatedAt: 'DESC'
                }
            });
        }
        return this.invoiceRepository.find({
            where: {
                vendorId: id
            }
        });
    }
    async findInvoiceByDate(fromDate, toDate, id) {
        if (id == 0) {
            return await this.invoiceRepository.findOne({
                where: [{
                        startDate: (0, typeorm_2.Between)(fromDate, toDate),
                        isFlightBooking: true
                    }, {
                        endDate: (0, typeorm_2.Between)(fromDate, toDate),
                        isFlightBooking: true
                    }
                ]
            });
        }
        return await this.invoiceRepository.findOne({
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
InvoiceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(invoice_entity_1.Invoice)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], InvoiceService);
exports.InvoiceService = InvoiceService;
//# sourceMappingURL=invoice.service.js.map