"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingsModule = void 0;
const common_1 = require("@nestjs/common");
const bookings_service_1 = require("./bookings.service");
const bookings_controller_1 = require("./bookings.controller");
const typeorm_1 = require("@nestjs/typeorm");
const booking_entity_1 = require("./entities/booking.entity");
const user_module_1 = require("../user/user.module");
const favourites_entity_1 = require("./entities/favourites.entity");
const rooms_module_1 = require("../rooms/rooms.module");
const stripe_module_1 = require("../stripe/stripe.module");
const email_module_1 = require("../email/email.module");
const hotels_module_1 = require("../hotels/hotels.module");
const umrahbookings_module_1 = require("../umrahbookings/umrahbookings.module");
const notifications_module_1 = require("../notifications/notifications.module");
let BookingsModule = class BookingsModule {
};
BookingsModule = __decorate([
    (0, common_1.Module)({
        controllers: [bookings_controller_1.BookingsController],
        providers: [bookings_service_1.BookingsService],
        imports: [typeorm_1.TypeOrmModule.forFeature([booking_entity_1.Booking, favourites_entity_1.Favourites]), user_module_1.UserModule, notifications_module_1.NotificationsModule, rooms_module_1.RoomsModule, stripe_module_1.StripeModule, email_module_1.EmailModule, umrahbookings_module_1.UmrahbookingsModule, (0, common_1.forwardRef)(() => hotels_module_1.HotelsModule)],
        exports: [bookings_service_1.BookingsService]
    })
], BookingsModule);
exports.BookingsModule = BookingsModule;
//# sourceMappingURL=bookings.module.js.map