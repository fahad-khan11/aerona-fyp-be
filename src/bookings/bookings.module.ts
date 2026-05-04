
import { forwardRef, Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { UserModule } from 'src/user/user.module';
import { Favourites } from './entities/favourites.entity';
import { RoomsModule } from 'src/rooms/rooms.module';
import { StripeModule } from 'src/stripe/stripe.module';
import { EmailModule } from 'src/email/email.module';
import { HotelsModule } from 'src/hotels/hotels.module';
import { UmrahbookingsModule } from 'src/umrahbookings/umrahbookings.module';

import { NotificationsModule } from 'src/notifications/notifications.module';

@Module({
  controllers: [BookingsController],
  providers: [BookingsService],
  imports: [TypeOrmModule.forFeature([Booking, Favourites]), UserModule, NotificationsModule,RoomsModule, StripeModule, EmailModule, UmrahbookingsModule, forwardRef(() => HotelsModule)],
  exports: [BookingsService]
})
export class BookingsModule { }
