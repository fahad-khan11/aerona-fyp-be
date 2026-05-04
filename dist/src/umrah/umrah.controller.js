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
exports.UmrahController = void 0;
const common_1 = require("@nestjs/common");
const umrah_service_1 = require("./umrah.service");
const create_umrah_dto_1 = require("./dto/create-umrah.dto");
const update_umrah_dto_1 = require("./dto/update-umrah.dto");
const platform_express_1 = require("@nestjs/platform-express");
const file_upload_service_1 = require("../file-upload/file-upload.service");
const swagger_1 = require("@nestjs/swagger");
const umrahbookings_service_1 = require("../umrahbookings/umrahbookings.service");
const guard_1 = require("../auth/guard");
const currentuser_1 = require("../decorator/currentuser");
let UmrahController = class UmrahController {
    constructor(umrahService, fileUploadService, umrahBookingService) {
        this.umrahService = umrahService;
        this.fileUploadService = fileUploadService;
        this.umrahBookingService = umrahBookingService;
    }
    async create(createUmrahDto, files, user) {
        var _a;
        var images = [];
        if (((_a = files === null || files === void 0 ? void 0 : files.hotelImages) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            for (const [index, file] of files.hotelImages.entries()) {
                var url;
                url = await this.fileUploadService.uploadToS3(file.buffer, file.originalname);
                images.push(url.Location);
            }
            const coverImage = await this.fileUploadService.uploadToS3(files.coverImage[0].buffer, files.coverImage[0].originalname);
            return this.umrahService.create(Object.assign(Object.assign({}, createUmrahDto), { hotelImages: images, coverImage: coverImage.Location, createdBy: user.userId }));
        }
        else
            throw new common_1.BadRequestException('please upload 1 image at least');
    }
    findAll(packageType, duration, city) {
        const parsedduration = duration ? parseInt(duration, 10) : undefined;
        return this.umrahService.findAll(packageType, parsedduration, city);
    }
    findByVendor(user) {
        return this.umrahService.findByVendor(user.userId);
    }
    findOne(id) {
        return this.umrahService.findOne(+id);
    }
    async update(id, updateHotelDto, files) {
        var _a, _b;
        if (((_a = files === null || files === void 0 ? void 0 : files.coverImage) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            updateHotelDto.coverImage = (await this.fileUploadService.uploadToS3(files.coverImage[0].buffer, files.coverImage[0].originalname)).Location;
        }
        var images = [];
        if (((_b = files === null || files === void 0 ? void 0 : files.hotelImages) === null || _b === void 0 ? void 0 : _b.length) > 0) {
            for (const [index, file] of files.hotelImages.entries()) {
                var url;
                url = await this.fileUploadService.uploadToS3(file.buffer, file.originalname);
                images.push(url.Location);
            }
            if (Array.isArray(updateHotelDto.hotelImages) && updateHotelDto.hotelImages.length > 0) {
                updateHotelDto.hotelImages = [...updateHotelDto.hotelImages, ...images];
                return this.umrahService.update(+id, updateHotelDto);
            }
            else
                return this.umrahService.update(+id, Object.assign(Object.assign({}, updateHotelDto), { hotelImages: images }));
        }
        else
            return this.umrahService.update(+id, updateHotelDto);
    }
    remove(id) {
        return this.umrahService.remove(+id);
    }
    async getStats(user) {
        const totalPackages = await this.umrahService.getStats(user.userId);
        const stats = await this.umrahBookingService.umrahBookingStats(user.userId);
        return { totalPackages, stats };
    }
};
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'coverImage', maxCount: 1 },
        { name: 'hotelImages', maxCount: 10 },
    ])),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, currentuser_1.currentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_umrah_dto_1.CreateUmrahDto, Object, Object]),
    __metadata("design:returntype", Promise)
], UmrahController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('packageType')),
    __param(1, (0, common_1.Query)('duration')),
    __param(2, (0, common_1.Query)('city')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], UmrahController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(guard_1.JwtAuthGuard),
    (0, common_1.Get)('/vendor/packages'),
    __param(0, (0, currentuser_1.currentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UmrahController.prototype, "findByVendor", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UmrahController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'coverImage', maxCount: 1 },
        { name: 'hotelImages', maxCount: 10 },
    ])),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_umrah_dto_1.UpdateUmrahDto, Object]),
    __metadata("design:returntype", Promise)
], UmrahController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UmrahController.prototype, "remove", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('/dashboard/stats'),
    (0, common_1.UseGuards)(guard_1.JwtAuthGuard),
    __param(0, (0, currentuser_1.currentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UmrahController.prototype, "getStats", null);
UmrahController = __decorate([
    (0, swagger_1.ApiTags)('umrah'),
    (0, common_1.Controller)('umrah'),
    __metadata("design:paramtypes", [umrah_service_1.UmrahService,
        file_upload_service_1.FileService,
        umrahbookings_service_1.UmrahbookingsService])
], UmrahController);
exports.UmrahController = UmrahController;
//# sourceMappingURL=umrah.controller.js.map