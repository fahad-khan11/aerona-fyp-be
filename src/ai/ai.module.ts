import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { Booking } from 'src/bookings/entities/booking.entity';
import { Umrahbooking } from 'src/umrahbookings/entities/umrahbooking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, Umrahbooking])],
  controllers: [AiController],
  providers: [AiService],
})
export class AiModule {}
