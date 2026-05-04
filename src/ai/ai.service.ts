import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from 'src/bookings/entities/booking.entity';
import { Umrahbooking } from 'src/umrahbookings/entities/umrahbooking.entity';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class AiService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(Umrahbooking)
    private readonly umrahBookingRepository: Repository<Umrahbooking>,
  ) { }

  async generateItinerary(userId: number) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return "AI configuration error: API Key is missing. Please check the backend .env file.";
    }

    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    try {
      // 1. Retrieve Data (RAG - Retrieval)
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

      // 2. Augment Prompt (RAG - Augmentation)
      let context = "User Bookings Data:\n";

      bookings.forEach(b => {
        context += `- Hotel Booking: ${b.hotel.name} in ${b.hotel.city || 'Makkah/Madinah'}. Check-in: ${b.checkIndate}, Check-out: ${b.checkOutDate}\n`;
      });

      umrahBookings.forEach(u => {
        context += `- Umrah Package: ${u.umrahPurchased.packageName}. Duration: ${u.umrahPurchased.duration} days. Cities: ${u.umrahPurchased.citiesCovered?.join(', ') || 'Makkah, Madinah'}. Details: ${u.umrahPurchased.shortDescription}\n`;
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

      // 3. Generate Content (RAG - Generation)
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error("Gemini AI Error:", error);
      return "I'm sorry, I encountered an error while generating your itinerary. Please try again later.";
    }
  }
}
