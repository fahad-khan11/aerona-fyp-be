import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { BookingsService } from 'src/bookings/bookings.service';
import { UmrahbookingsService } from 'src/umrahbookings/umrahbookings.service';


@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService,
    private readonly bookingsService: BookingsService,
    private readonly umrahBookingsService: UmrahbookingsService,

  ) {}

  @Post()
  create(@Body() createInvoiceDto: CreateInvoiceDto) {
    return this.invoicesService.create(createInvoiceDto);
  }

  @Get()
  findAll() {
    return this.invoicesService.findAll();
  }

   @Get('/admin/hotels')
  findAdminHotelInvoice() {
    return this.bookingsService.hotelInvoiceAdmin()
  }

   @Get('/admin/umrah')
  findAdminUmrahInvoice() {
    return this.umrahBookingsService.hotelInvoiceAdmin()
  }

 
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoicesService.findOne(+id);
  }
  @Get('vendor/:vendorId/month/:monthYear')
async getVendorMonthPayments(
  @Param('vendorId') vendorId: number,
  @Param('monthYear') monthYear: string,
) {
   return this.bookingsService.findVendorInvoice(monthYear, vendorId);
}

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
    return this.invoicesService.update(+id, updateInvoiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invoicesService.remove(+id);
  }

  @Get('/agent/comission/:agentId')
  async getAgentComission(@Param('agentId') agentId: number) {
    return await this.bookingsService.findMonthAgentComission(agentId)
    
  }
}
