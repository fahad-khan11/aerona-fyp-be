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
exports.RoomType = exports.Room = void 0;
const base_entity_1 = require("../../../base.entity");
const booking_entity_1 = require("../../bookings/entities/booking.entity");
const hotel_entity_1 = require("../../hotels/entities/hotel.entity");
const typeorm_1 = require("typeorm");
let Room = class Room extends base_entity_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Room.prototype, "roomType", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Room.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Room.prototype, "maxOccupancy", void 0);
__decorate([
    (0, typeorm_1.Column)("simple-json"),
    __metadata("design:type", Array)
], Room.prototype, "bedConfiguration", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Room.prototype, "roomSize", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Room.prototype, "roomSizeUnit", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Room.prototype, "basePrice", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true
    }),
    __metadata("design:type", Number)
], Room.prototype, "discountedPrice", void 0);
__decorate([
    (0, typeorm_1.Column)('text', {
        nullable: true,
        array: true,
    }),
    __metadata("design:type", Array)
], Room.prototype, "amenities", void 0);
__decorate([
    (0, typeorm_1.Column)('text', {
        nullable: true,
        array: true,
    }),
    __metadata("design:type", Array)
], Room.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Room.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Room.prototype, "smokingAllowed", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Room.prototype, "availableUntil", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => hotel_entity_1.Hotel, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", hotel_entity_1.Hotel)
], Room.prototype, "hotel", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => booking_entity_1.Booking, (booking) => booking.room, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", booking_entity_1.Booking)
], Room.prototype, "booking", void 0);
Room = __decorate([
    (0, typeorm_1.Entity)('rooms')
], Room);
exports.Room = Room;
var RoomType;
(function (RoomType) {
    RoomType["STANDARD"] = "standard";
    RoomType["DELUXE"] = "deluxe";
    RoomType["SUITE"] = "suite";
    RoomType["EXECUTIVE"] = "executive";
    RoomType["FAMILY"] = "family";
    RoomType["CONNECTING"] = "connecting";
})(RoomType = exports.RoomType || (exports.RoomType = {}));
//# sourceMappingURL=room.entity.js.map