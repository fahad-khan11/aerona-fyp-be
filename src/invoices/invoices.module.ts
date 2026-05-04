import { Module } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { BookingsModule } from 'src/bookings/bookings.module';
import { UmrahbookingsModule } from 'src/umrahbookings/umrahbookings.module';


@Module({
  controllers: [InvoicesController],
  providers: [InvoicesService],
  imports:[BookingsModule,UmrahbookingsModule],

})
export class InvoicesModule {}
