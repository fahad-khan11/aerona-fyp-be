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
exports.RoomsController = void 0;
const common_1 = require("@nestjs/common");
const rooms_service_1 = require("./rooms.service");
const create_room_dto_1 = require("./dto/create-room.dto");
const update_room_dto_1 = require("./dto/update-room.dto");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const file_upload_service_1 = require("../file-upload/file-upload.service");
let RoomsController = class RoomsController {
    constructor(roomsService, fileUploadService) {
        this.roomsService = roomsService;
        this.fileUploadService = fileUploadService;
    }
    async create(createRoomDto, files) {
        var images = [];
        if ((files === null || files === void 0 ? void 0 : files.length) > 0) {
            for (const [index, file] of files.entries()) {
                var url;
                url = await this.fileUploadService.uploadToS3(file.buffer, file.originalname);
                images.push(url.Location);
            }
            return this.roomsService.create(Object.assign(Object.assign({}, createRoomDto), { images: images }));
        }
        else
            return this.roomsService.create(createRoomDto);
    }
    findAll() {
        return this.roomsService.findAll();
    }
    async findByHotelId(id, date) {
        return this.roomsService.findByHotelId(+id, date);
    }
    findOne(id) {
        return this.roomsService.findOne(+id);
    }
    async update(id, updateRoomDto, files) {
        var images = [];
        if ((files === null || files === void 0 ? void 0 : files.length) > 0) {
            for (const [index, file] of files.entries()) {
                var url;
                url = await this.fileUploadService.uploadToS3(file.buffer, file.originalname);
                images.push(url.Location);
            }
            if (Array.isArray(updateRoomDto.images) &&
                updateRoomDto.images.length > 0) {
                updateRoomDto.images = [...updateRoomDto.images, ...images];
                return this.roomsService.update(+id, Object.assign(Object.assign({}, updateRoomDto), { images: images }));
            }
            else
                return this.roomsService.update(+id, Object.assign(Object.assign({}, updateRoomDto), { images: images }));
        }
        else
            return this.roomsService.update(+id, updateRoomDto);
    }
    remove(id) {
        return this.roomsService.remove(+id);
    }
    getHotelRooms(id) {
        return this.roomsService.getHotelRooms(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.AnyFilesInterceptor)()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_room_dto_1.CreateRoomDto,
        Array]),
    __metadata("design:returntype", Promise)
], RoomsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RoomsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/hotel/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Date]),
    __metadata("design:returntype", Promise)
], RoomsController.prototype, "findByHotelId", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RoomsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.AnyFilesInterceptor)()),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_room_dto_1.UpdateRoomDto,
        Array]),
    __metadata("design:returntype", Promise)
], RoomsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RoomsController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('/vendor/hotel/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RoomsController.prototype, "getHotelRooms", null);
RoomsController = __decorate([
    (0, common_1.Controller)('rooms'),
    (0, swagger_1.ApiTags)('Room'),
    __metadata("design:paramtypes", [rooms_service_1.RoomsService,
        file_upload_service_1.FileService])
], RoomsController);
exports.RoomsController = RoomsController;
//# sourceMappingURL=rooms.controller.js.map