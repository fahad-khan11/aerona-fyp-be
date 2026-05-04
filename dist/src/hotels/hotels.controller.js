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
exports.HotelsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const hotels_service_1 = require("./hotels.service");
const create_hotel_dto_1 = require("./dto/create-hotel.dto");
const update_hotel_dto_1 = require("./dto/update-hotel.dto");
const swagger_1 = require("@nestjs/swagger");
const guard_1 = require("../auth/guard");
const currentuser_1 = require("../decorator/currentuser");
const user_service_1 = require("../user/user.service");
const bookings_service_1 = require("../bookings/bookings.service");
const create_favourite_dto_1 = require("../bookings/dto/create-favourite.dto");
const file_upload_service_1 = require("../file-upload/file-upload.service");
const user_entity_1 = require("../user/entities/user.entity");
let HotelsController = class HotelsController {
    constructor(hotelsService, usersService, bookingsService, fileUploadService) {
        this.hotelsService = hotelsService;
        this.usersService = usersService;
        this.bookingsService = bookingsService;
        this.fileUploadService = fileUploadService;
    }
    async create(createHotelDto, user, files) {
        const currentUser = await this.usersService.findOne(user.userId);
        var images = [];
        if ((files === null || files === void 0 ? void 0 : files.length) > 0) {
            for (const [index, file] of files.entries()) {
                var url;
                url = await this.fileUploadService.uploadToS3(file.buffer, file.originalname);
                images.push(url.Location);
            }
            return this.hotelsService.create(Object.assign(Object.assign({}, createHotelDto), { user: currentUser, images: images }));
        }
        else
            return this.hotelsService.create(Object.assign(Object.assign({}, createHotelDto), { user: currentUser }));
    }
    async createByAgoda(createHotelDto) {
        return this.hotelsService.create(createHotelDto);
    }
    async findAll(user) {
        return this.hotelsService.findAll(user.userId);
    }
    async findAllHotels(location) {
        return this.hotelsService.findAllHotels(location);
    }
    async getAllHotelsAdmin(page = 1, limit = 10, status) {
        return this.hotelsService.findAllHotelsAdmin(page, limit, status);
    }
    async findHotelPending(user) {
        return this.hotelsService.findPendingHotel(user.userId);
    }
    async findHotelCompleted(user) {
        return this.hotelsService.findCompletedHotel(user.userId);
    }
    findOne(id) {
        return this.hotelsService.findOne(+id);
    }
    async update(id, updateHotelDto, files) {
        var images = [];
        if ((files === null || files === void 0 ? void 0 : files.length) > 0) {
            for (const [index, file] of files.entries()) {
                var url;
                url = await this.fileUploadService.uploadToS3(file.buffer, file.originalname);
                images.push(url.Location);
            }
            if (Array.isArray(updateHotelDto.images) && updateHotelDto.images.length > 0) {
                updateHotelDto.images = [...updateHotelDto.images, ...images];
                return this.hotelsService.update(+id, updateHotelDto);
            }
            else
                return this.hotelsService.update(+id, Object.assign(Object.assign({}, updateHotelDto), { images: images }));
        }
        else
            return this.hotelsService.update(+id, updateHotelDto);
    }
    remove(id) {
        return this.hotelsService.remove(+id);
    }
    async createFavourite(createFavouriteDto, user) {
        const currentUser = await this.usersService.findOne(user.userId);
        const existingFavourite = await this.bookingsService.findFavourite(currentUser.id, createFavouriteDto.hotel);
        if (existingFavourite.length > 0) {
            throw new common_1.HttpException('Favourite already exists', 400);
        }
        return this.bookingsService.createFavourite(Object.assign(Object.assign({}, createFavouriteDto), { user: currentUser }));
    }
    async findAllFavourite(user) {
        return this.bookingsService.findUserFavourites(user.userId);
    }
    async findVendorHotels(id) {
        return this.hotelsService.findAll(+id);
    }
    async getAgodaHotel(id) {
        return this.hotelsService.getAgodaHotel(id);
    }
    async removeFavourite(id) {
        return await this.bookingsService.removeFavourite(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.AnyFilesInterceptor)()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, currentuser_1.currentUser)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_hotel_dto_1.CreateHotelDto, Object, Array]),
    __metadata("design:returntype", Promise)
], HotelsController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('/by/agoda'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_hotel_dto_1.CreateHotelDto]),
    __metadata("design:returntype", Promise)
], HotelsController.prototype, "createByAgoda", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(guard_1.JwtAuthGuard),
    __param(0, (0, currentuser_1.currentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HotelsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/all/list'),
    __param(0, (0, common_1.Query)('location')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HotelsController.prototype, "findAllHotels", null);
__decorate([
    (0, common_1.Get)('/admin/list'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], HotelsController.prototype, "getAllHotelsAdmin", null);
__decorate([
    (0, common_1.Get)('/pending'),
    (0, common_1.UseGuards)(guard_1.JwtAuthGuard),
    __param(0, (0, currentuser_1.currentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HotelsController.prototype, "findHotelPending", null);
__decorate([
    (0, common_1.Get)('/completed'),
    (0, common_1.UseGuards)(guard_1.JwtAuthGuard),
    __param(0, (0, currentuser_1.currentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HotelsController.prototype, "findHotelCompleted", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HotelsController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.AnyFilesInterceptor)()),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_hotel_dto_1.UpdateHotelDto, Array]),
    __metadata("design:returntype", Promise)
], HotelsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HotelsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('/add/favourites'),
    (0, common_1.UseGuards)(guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, currentuser_1.currentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_favourite_dto_1.CreateFavouriteDto, Object]),
    __metadata("design:returntype", Promise)
], HotelsController.prototype, "createFavourite", null);
__decorate([
    (0, common_1.Get)('/favourites/users'),
    (0, common_1.UseGuards)(guard_1.JwtAuthGuard),
    __param(0, (0, currentuser_1.currentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HotelsController.prototype, "findAllFavourite", null);
__decorate([
    (0, common_1.Get)('admin/vendors/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HotelsController.prototype, "findVendorHotels", null);
__decorate([
    (0, common_1.Get)('/agoda/exist'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HotelsController.prototype, "getAgodaHotel", null);
__decorate([
    (0, common_1.Delete)('/favourites/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HotelsController.prototype, "removeFavourite", null);
HotelsController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('hotels'),
    (0, swagger_1.ApiTags)('hotels'),
    __metadata("design:paramtypes", [hotels_service_1.HotelsService,
        user_service_1.UserService,
        bookings_service_1.BookingsService,
        file_upload_service_1.FileService])
], HotelsController);
exports.HotelsController = HotelsController;
//# sourceMappingURL=hotels.controller.js.map