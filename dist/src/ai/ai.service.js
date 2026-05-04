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
exports.AiService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const booking_entity_1 = require("../bookings/entities/booking.entity");
const umrahbooking_entity_1 = require("../umrahbookings/entities/umrahbooking.entity");
const generative_ai_1 = require("@google/generative-ai");
let AiService = class AiService {
    constructor(bookingRepository, umrahBookingRepository) {
        this.bookingRepository = bookingRepository;
        this.umrahBookingRepository = umrahBookingRepository;
    }
    async generateItinerary(userId) {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return "AI configuration error: API Key is missing. Please check the backend .env file.";
        }
        this.genAI = new generative_ai_1.GoogleGenerativeAI(apiKey);
        this.model = this.genAI.getGenerativeModel({ model: "gemini-flash-latest" });
        try {
            const bookings = await this.bookingRepository.find({
                where: { user: { id: userId } },
                relations: ['hotel'],
            });
            const umrahBookings = await this.umrahBookingRepository.find({
                where: { user: { id: userId } },
                relations: ['umrahPurchased'],
            });
            if (bookings.length === 0 && umrahBookings.length === 0) {
                return "You don't have any active bookings to generate an itinerary for. Please book a hotel or Umrah package first.";
            }
            let context = "User Bookings Data:\n";
            bookings.forEach(b => {
                context += `- Hotel Booking: ${b.hotel.name} in ${b.hotel.city || 'Makkah/Madinah'}. Check-in: ${b.checkIndate}, Check-out: ${b.checkOutDate}\n`;
            });
            umrahBookings.forEach(u => {
                var _a;
                context += `- Umrah Package: ${u.umrahPurchased.packageName}. Duration: ${u.umrahPurchased.duration} days. Cities: ${((_a = u.umrahPurchased.citiesCovered) === null || _a === void 0 ? void 0 : _a.join(', ')) || 'Makkah, Madinah'}. Details: ${u.umrahPurchased.shortDescription}\n`;
            });
            const prompt = `
        You are Aeronaa's Smart AI Itinerary Assistant.
        Aeronaa is a one-stop digital gateway for hotels and Umrah.
        
        Using the following REAL user booking data from our database, generate a highly personalized spiritual itinerary.
        
        CONTEXT DATA:
        ${context}
        
        INSTRUCTIONS:
        1. Create a day-by-day plan.
        2. If there are gaps (e.g., flight arrival at 10 AM but hotel check-in at 2 PM), suggest specific activities like visiting a nearby museum, eating at a local halal restaurant, or resting in the Haram.
        3. Be encouraging, spiritual, and helpful.
        4. Mention specific cities (Makkah/Madinah) based on the bookings.
        5. Use clear headings for each day.
        
        Format the response in clean Markdown.
      `;
            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            return response.text();
        }
        catch (error) {
            console.error("Gemini AI Error:", error);
            return "I'm sorry, I encountered an error while generating your itinerary. Please try again later.";
        }
    }
};
AiService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(booking_entity_1.Booking)),
    __param(1, (0, typeorm_1.InjectRepository)(umrahbooking_entity_1.Umrahbooking)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], AiService);
exports.AiService = AiService;
//# sourceMappingURL=ai.service.js.map