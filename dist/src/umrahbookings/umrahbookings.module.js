"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UmrahbookingsModule = void 0;
const common_1 = require("@nestjs/common");
const umrahbookings_service_1 = require("./umrahbookings.service");
const umrahbookings_controller_1 = require("./umrahbookings.controller");
const typeorm_1 = require("@nestjs/typeorm");
const umrahbooking_entity_1 = require("./entities/umrahbooking.entity");
let UmrahbookingsModule = class UmrahbookingsModule {
};
UmrahbookingsModule = __decorate([
    (0, common_1.Module)({
        controllers: [umrahbookings_controller_1.UmrahbookingsController],
        providers: [umrahbookings_service_1.UmrahbookingsService],
        imports: [typeorm_1.TypeOrmModule.forFeature([umrahbooking_entity_1.Umrahbooking])],
        exports: [umrahbookings_service_1.UmrahbookingsService]
    })
], UmrahbookingsModule);
exports.UmrahbookingsModule = UmrahbookingsModule;
//# sourceMappingURL=umrahbookings.module.js.map