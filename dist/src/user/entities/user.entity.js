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
exports.Role = exports.User = exports.Status = void 0;
const base_entity_1 = require("../../../base.entity");
const typeorm_1 = require("typeorm");
var Status;
(function (Status) {
    Status["PENDING"] = "pending";
    Status["APPROVED"] = "approved";
    Status["BLOCKED"] = "blocked";
})(Status = exports.Status || (exports.Status = {}));
let User = class User extends base_entity_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({}),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false, nullable: true }),
    __metadata("design:type", Boolean)
], User.prototype, "isEmailVerified", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: Status.PENDING }),
    __metadata("design:type", String)
], User.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "verificationCode", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, nullable: true }),
    __metadata("design:type", Array)
], User.prototype, "permissions", void 0);
User = __decorate([
    (0, typeorm_1.Entity)('User')
], User);
exports.User = User;
var Role;
(function (Role) {
    Role["VENDOR"] = "vendor";
    Role["USER"] = "user";
    Role["ADMIN"] = "admin";
    Role["SUPPORT"] = "support";
    Role["CARRENTAL"] = "carrental";
    Role["PROPERTY"] = "property";
    Role["AGENT"] = "agent";
    Role["UMRAH"] = "umrah";
})(Role = exports.Role || (exports.Role = {}));
//# sourceMappingURL=user.entity.js.map