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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
let UserService = class UserService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async create(createUserDto) {
        return await this.usersRepository.save(createUserDto);
    }
    async verifyUser(email, verificationCode) {
        const user = await this.findByEmail(email);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (user.verificationCode !== verificationCode) {
            throw new common_1.UnauthorizedException('Invalid verification code');
        }
        user.isEmailVerified = true;
        user.verificationCode = null;
        await this.update(user.id, user);
        return user;
    }
    async matchCode(email, verificationCode) {
        const user = await this.findByEmail(email);
        if (user.verificationCode === verificationCode) {
            return user;
        }
        throw new common_1.UnauthorizedException('Invalid verification code');
    }
    async confirmUser(email) {
        const user = await this.findByEmail(email);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        user.verificationCode = verificationCode;
        return await this.usersRepository.save(user);
    }
    async findAll(role, status) {
        return await this.usersRepository.find({
            where: {
                role,
                status
            },
            select: {
                password: false
            }
        });
    }
    async updateStatus() {
        return await this.usersRepository.update({ status: user_entity_1.Status.PENDING }, { status: user_entity_1.Status.APPROVED });
    }
    async findByEmail(email) {
        return await this.usersRepository.findOne({ where: { email } });
    }
    async findOne(id) {
        return await this.usersRepository.findOne({ where: { id } });
    }
    async update(id, updateUserDto) {
        return await this.usersRepository.update(id, updateUserDto);
    }
    async remove(id) {
        return await this.usersRepository.delete(id);
    }
    async findTotalUsers() {
        const userCount = await this.usersRepository.count({
            where: {
                role: user_entity_1.Role.USER,
                status: user_entity_1.Status.APPROVED
            }
        });
        const vendorCount = await this.usersRepository.count({
            where: {
                role: user_entity_1.Role.VENDOR,
                status: user_entity_1.Status.APPROVED
            }
        });
        return {
            userCount,
            vendorCount
        };
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map