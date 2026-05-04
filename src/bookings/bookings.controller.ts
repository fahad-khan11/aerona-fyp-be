import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { UserService } from 'src/user/user.service';
import { currentUser } from 'src/decorator/currentuser';
import { JwtAuthGuard } from 'src/auth/guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RoomsService } from 'src/rooms/rooms.service';
import { CreateFavouriteDto } from './dto/create-favourite.dto';
import { StripeService } from 'src/stripe/stripe.service';
import { EmailService } from 'src/email/email.service';
import { HotelsService } from 'src/hotels/hotels.service';
import { Hotel } from 'src/hotels/entities/hotel.entity';
import { PaymentType } from './entities/booking.entity';
import { UmrahbookingsService } from 'src/umrahbookings/umrahbookings.service';

import { NotificationsService } from 'src/notifications/notifications.service';

@ApiBearerAuth()
@ApiTags('bookings')
@Controller('bookings')
export class BookingsController {
  constructor(
    private readonly bookingsService: BookingsService,
    private readonly usersService: UserService,
    private readonly roomService: RoomsService,
    private readonly stripeService: StripeService,
    private readonly emailService: EmailService,
    private readonly hotelService: HotelsService,
    private readonly umrahBookingService: UmrahbookingsService,

    private readonly notificationService:NotificationsService,
    
    
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createBookingDto: CreateBookingDto,
    @currentUser() user: any,
  ) {
    const currentUser = await this.usersService.findOne(user.userId);
    const room = await this.roomService.findByIds(createBookingDto.room);


    const booking=await this.bookingsService.create({
      ...createBookingDto,
      user: currentUser,
      room: room,
    });
    const newBooking=await this.bookingsService.findOne(booking.id);

    const notification = await this.notificationService.create({
            text:`you have a new booking with id AER-${newBooking.id} for the hotel ${newBooking.hotel.name} for the date ${newBooking.checkIndate} `,
          
             
              link:"",
          
             
              seen:false,
      
              notificationFor: newBooking.hotel.user,

    });
      const notificationForUser = await this.notificationService.create({
            text:`your  booking is confirmed with the booking id AER-${newBooking.id} for the hotel ${newBooking.hotel.name} for the date ${newBooking.checkIndate} `,
          
             
              link:"",
          
             
              seen:false,
      
              notificationFor: newBooking.user,

    });
   
    const mail=await this.emailService.sendHotelBookingMail({
      to:currentUser.email,
      subject:"Hotel Booking confirmation",
      text:"Your booking is confirmed" },
      booking.id.toString(),
      newBooking.hotel.name,
      booking.checkIndate.toString(),
      booking.checkOutDate.toString(),
      booking.room[0].roomType,
      booking.numberOfDays,
      booking.amount,
      currentUser.name
      
    )
      const adminMail=await this.emailService.sendHotelBookingMailAdmin({
      to:"admin@aeronaa.com",
      subject:"Hotel Booking confirmation",
      text:"You have a new booking confirmed" },
      booking.id.toString(),
      newBooking.hotel.name,
      booking.checkIndate.toString(),
      booking.checkOutDate.toString(),
      booking.room[0].roomType,
      booking.numberOfDays,
      booking.amount,
      currentUser.name
      
    )
    
     return booking

  }


  @Post('checkout')
  async createCheckout(@Body() body: any) {
    const session = await this.stripeService.createCheckoutSession({
      amount: body.amount,
      currency: body.currency,
      successUrl: body.successUrl,
      cancelUrl: body.cancelUrl,
      customerEmail: body.email,
      metadata: {
        bookingId: body.bookingId,
      },
    });

    return { url: session.url };
  }

  @Get()
  findAll(@Query()paymnetType:PaymentType) {
    return this.bookingsService.findAll(paymnetType);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user/upcoming')
  findUpComing(@currentUser() user: any) {
    return this.bookingsService.findUpComing(user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user/past')
  findPast(@currentUser() user: any) {
    return this.bookingsService.findPast(user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user/cancelled')
  findCancelled(@currentUser() user: any) {
    return this.bookingsService.findCancelled(user.userId);
  }

  @Get('/user')
  @UseGuards(JwtAuthGuard)
  findAllUserBookings(@currentUser() user: any) {
    return this.bookingsService.findUserBookings(user.userId);
  }

  @Get('/user/dashboard/stats')
  @UseGuards(JwtAuthGuard)
  async findAllVendorDashBoardStats(@currentUser() user: any) {
    const hotelscount= await this.hotelService.findVendorHotelsCount(user.userId);
    const bookingCount=await this.bookingsService.findAllVendorDashBoardStats(user.userId)
    return {
      ...hotelscount,...bookingCount
    }
  }

  @Get('/hotel/:id')
  findAllHotelBookings(@Param('id') id: string) {
    return this.bookingsService.findHotelBookings(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingsService.update(+id, updateBookingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingsService.remove(+id);
  }

  @Get('vendor/payments/:id')
  async getVendorPayments(
    @Param('id') id: string,
    @Query('startDate') startDate: Date,
    @Query('endDate') endDate: Date,
  ) {
    return this.bookingsService.getVendorPayments( +id,startDate,endDate);
  }

   @Get('vendor/bookings/details/:id')
  async getVendorBookingsDetails(
    @Param('id') id: string,
    @Query('startDate') startDate: Date,
    @Query('endDate') endDate: Date,
  ) {
    return this.bookingsService.getVendorPaymentsDetails( +id,startDate,endDate);
  }

  @Get('/admin/stats')
  async getAdminStats() {
    const totalUsers=await this.usersService.findTotalUsers()
    const bookingStats=await this.bookingsService.findTotalBookings()
    const monthwiseRevenue=await this.bookingsService.findMonthWiseRevenue()

    const umrahBookingStats=await this.umrahBookingService.findTotalBookings()
  
   

    return{
      userCount:totalUsers.userCount,
      vendorCount:totalUsers.vendorCount,
      totalBookings:bookingStats.totalBookings+umrahBookingStats.totalBookings,
      totalAmount:Number(bookingStats.totalAmount.totalAmount)+Number(umrahBookingStats.totalAmount.totalAmount),
      monthRevenue:monthwiseRevenue,
      
      umrahbookings:umrahBookingStats.totalBookings,
    
      hotelBookings:bookingStats.totalBookings,
    }

  }

  @Get('agent/:id')
  async getAgentBookings(@Param('id')id:string){
    return this.bookingsService.findUserBookings(+id)

  }

  @Get('/month/:id')
  async getMonthBookings(@Param('id')id:string,@Query('month')month:string){
    return this.bookingsService.findMonthBookingsForVendor(+id,month)}
}
