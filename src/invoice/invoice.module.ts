import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingsModule } from 'src/bookings/bookings.module';
import { UmrahbookingsModule } from 'src/umrahbookings/umrahbookings.module';

import { Invoice } from './entities/invoice.entity';


@Module({
  controllers: [InvoiceController],
  providers: [InvoiceService],
  exports:[InvoiceService],
  imports:[TypeOrmModule.forFeature([Invoice]),BookingsModule,UmrahbookingsModule],
})
export class InvoiceModule {}
