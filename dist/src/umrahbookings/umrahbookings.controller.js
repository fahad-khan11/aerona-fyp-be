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
exports.UmrahbookingsController = void 0;
const common_1 = require("@nestjs/common");
const umrahbookings_service_1 = require("./umrahbookings.service");
const create_umrahbooking_dto_1 = require("./dto/create-umrahbooking.dto");
const update_umrahbooking_dto_1 = require("./dto/update-umrahbooking.dto");
const swagger_1 = require("@nestjs/swagger");
const guard_1 = require("../auth/guard");
const currentuser_1 = require("../decorator/currentuser");
let UmrahbookingsController = class UmrahbookingsController {
    constructor(umrahbookingsService) {
        this.umrahbookingsService = umrahbookingsService;
    }
    create(createUmrahbookingDto, user) {
        return this.umrahbookingsService.create(Object.assign(Object.assign({}, createUmrahbookingDto), { user: user.userId }));
    }
    findAll() {
        return this.umrahbookingsService.findAll();
    }
    findOne(id) {
        return this.umrahbookingsService.findOne(+id);
    }
    update(id, updateUmrahbookingDto) {
        return this.umrahbookingsService.update(+id, updateUmrahbookingDto);
    }
    remove(id) {
        return this.umrahbookingsService.remove(+id);
    }
    async getAgentBookings(id) {
        return this.umrahbookingsService.findUserBookings(+id);
    }
    async getVenderBookings(user) {
        return this.umrahbookingsService.findUserBookings(user.userId);
    }
};
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, currentuser_1.currentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_umrahbooking_dto_1.CreateUmrahbookingDto, Object]),
    __metadata("design:returntype", void 0)
], UmrahbookingsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UmrahbookingsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UmrahbookingsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_umrahbooking_dto_1.UpdateUmrahbookingDto]),
    __metadata("design:returntype", void 0)
], UmrahbookingsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UmrahbookingsController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('/agent/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UmrahbookingsController.prototype, "getAgentBookings", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(guard_1.JwtAuthGuard),
    (0, common_1.Get)('vender/only'),
    __param(0, (0, currentuser_1.currentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UmrahbookingsController.prototype, "getVenderBookings", null);
UmrahbookingsController = __decorate([
    (0, swagger_1.ApiTags)('umrahbbokings'),
    (0, common_1.Controller)('umrahbookings'),
    __metadata("design:paramtypes", [umrahbookings_service_1.UmrahbookingsService])
], UmrahbookingsController);
exports.UmrahbookingsController = UmrahbookingsController;
//# sourceMappingURL=umrahbookings.controller.js.map