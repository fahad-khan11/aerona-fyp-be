"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UmrahModule = void 0;
const common_1 = require("@nestjs/common");
const umrah_service_1 = require("./umrah.service");
const umrah_controller_1 = require("./umrah.controller");
const typeorm_1 = require("@nestjs/typeorm");
const umrah_entity_1 = require("./entities/umrah.entity");
const file_upload_module_1 = require("../file-upload/file-upload.module");
const umrahbookings_module_1 = require("../umrahbookings/umrahbookings.module");
let UmrahModule = class UmrahModule {
};
UmrahModule = __decorate([
    (0, common_1.Module)({
        controllers: [umrah_controller_1.UmrahController],
        providers: [umrah_service_1.UmrahService],
        imports: [typeorm_1.TypeOrmModule.forFeature([umrah_entity_1.Umrah]), file_upload_module_1.FileUploadModule, umrahbookings_module_1.UmrahbookingsModule],
    })
], UmrahModule);
exports.UmrahModule = UmrahModule;
//# sourceMappingURL=umrah.module.js.map