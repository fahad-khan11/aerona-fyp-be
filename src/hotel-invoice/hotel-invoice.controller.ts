import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { HotelInvoiceService } from './hotel-invoice.service';
import { CreateHotelInvoiceDto } from './dto/create-hotel-invoice.dto';
import { UpdateHotelInvoiceDto } from './dto/update-hotel-invoice.dto';
import { BookingsService } from 'src/bookings/bookings.service';

@Controller('hotel-invoice')
export class HotelInvoiceController {
  constructor(private readonly hotelInvoiceService: HotelInvoiceService,
    private readonly bookindService: BookingsService
  ) { }

  @Post()
  async create(@Body() createHotelInvoiceDto: CreateHotelInvoiceDto) {
    const invoiceExist = await this.hotelInvoiceService.findInvoiceByDate(createHotelInvoiceDto.startDate, createHotelInvoiceDto.endDate, createHotelInvoiceDto.vendorId)
    
    if (invoiceExist) {
      throw new BadRequestException('The dates selected are already included in existing invoices')
    }

  

    const result = await this.bookindService.getInvoiceSum(
      createHotelInvoiceDto.vendorId,
      createHotelInvoiceDto.startDate,
      createHotelInvoiceDto.endDate
    )

    createHotelInvoiceDto.totalsales = result.total
    createHotelInvoiceDto.onlineRecieved = result.onlineTotal
    createHotelInvoiceDto.hotelRecieved = result.payAtHotelTotal
    if (!createHotelInvoiceDto.totalsales) {
      throw new BadRequestException('No bookings found for the selected dates')
    }
    if(!createHotelInvoiceDto.onlineRecieved){
      createHotelInvoiceDto.onlineRecieved = 0
    }
    if(!createHotelInvoiceDto.hotelRecieved){
      createHotelInvoiceDto.hotelRecieved = 0
    }
    createHotelInvoiceDto.aeronaaComission = Math.floor(0.03 * createHotelInvoiceDto.totalsales)
   

    createHotelInvoiceDto.vendorNet = createHotelInvoiceDto.totalsales - createHotelInvoiceDto.aeronaaComission
    if (createHotelInvoiceDto.aeronaaComission > createHotelInvoiceDto.onlineRecieved) {
      createHotelInvoiceDto.toBePaidBY = 'vendor'
      createHotelInvoiceDto.amountToBePaid = createHotelInvoiceDto.aeronaaComission - createHotelInvoiceDto.onlineRecieved
    }
    if (createHotelInvoiceDto.aeronaaComission < createHotelInvoiceDto.onlineRecieved) {
      createHotelInvoiceDto.toBePaidBY = 'aeronaa'
      createHotelInvoiceDto.amountToBePaid =createHotelInvoiceDto.onlineRecieved - createHotelInvoiceDto.aeronaaComission
    }
        if (createHotelInvoiceDto.aeronaaComission == createHotelInvoiceDto.onlineRecieved) {
      createHotelInvoiceDto.toBePaidBY = 'none'
      createHotelInvoiceDto.amountToBePaid =0
    }

    return this.hotelInvoiceService.create(createHotelInvoiceDto);
  }

  @Get()
  findAll() {
    return this.hotelInvoiceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hotelInvoiceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHotelInvoiceDto: UpdateHotelInvoiceDto) {
    return this.hotelInvoiceService.update(+id, updateHotelInvoiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hotelInvoiceService.remove(+id);
  }
}
