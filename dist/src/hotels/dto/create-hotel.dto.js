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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateHotelDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const user_entity_1 = require("../../user/entities/user.entity");
class CreateHotelDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'name of the hotel',
        required: true,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateHotelDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'description of the hotel',
        required: true,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateHotelDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({}),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateHotelDto.prototype, "starRating", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({}),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateHotelDto.prototype, "Address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({}),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateHotelDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({}),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateHotelDto.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({}),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateHotelDto.prototype, "zipCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({}),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateHotelDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({}),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateHotelDto.prototype, "checkInTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({}),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateHotelDto.prototype, "checkOutTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({}),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], CreateHotelDto.prototype, "availableFrom", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({}),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], CreateHotelDto.prototype, "availableTo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ameneties will be in the form of array',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateHotelDto.prototype, "amenities", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateHotelDto.prototype, "images", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'tags will be in the form of array',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateHotelDto.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'flag for hotel completion when the form is submitted fully send true else false ',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateHotelDto.prototype, "isCompleted", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", user_entity_1.User)
], CreateHotelDto.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'userId of the user who created the hotel',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateHotelDto.prototype, "dataByApi", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateHotelDto.prototype, "averagePrice", void 0);
exports.CreateHotelDto = CreateHotelDto;
//# sourceMappingURL=create-hotel.dto.js.map