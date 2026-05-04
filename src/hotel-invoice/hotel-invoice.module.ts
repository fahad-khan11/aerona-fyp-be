import { Module } from '@nestjs/common';
import { HotelInvoiceService } from './hotel-invoice.service';
import { HotelInvoiceController } from './hotel-invoice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelInvoice } from './entities/hotel-invoice.entity';
import { BookingsModule } from 'src/bookings/bookings.module';

@Module({
  controllers: [HotelInvoiceController],
  providers: [HotelInvoiceService],
  imports:[TypeOrmModule.forFeature([HotelInvoice]),BookingsModule],
})
export class HotelInvoiceModule {}
