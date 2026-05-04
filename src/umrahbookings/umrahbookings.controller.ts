import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UmrahbookingsService } from './umrahbookings.service';
import { CreateUmrahbookingDto } from './dto/create-umrahbooking.dto';
import { UpdateUmrahbookingDto } from './dto/update-umrahbooking.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard';
import { currentUser } from 'src/decorator/currentuser';

@ApiTags('umrahbbokings')
@Controller('umrahbookings')
export class UmrahbookingsController {
  constructor(private readonly umrahbookingsService: UmrahbookingsService) {}

  @ApiBearerAuth()
   @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createUmrahbookingDto: CreateUmrahbookingDto,@currentUser()user:any) {
    return this.umrahbookingsService.create({...createUmrahbookingDto,user:user.userId});
  }

  @Get()
  findAll() {
    return this.umrahbookingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.umrahbookingsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUmrahbookingDto: UpdateUmrahbookingDto) {
    return this.umrahbookingsService.update(+id, updateUmrahbookingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.umrahbookingsService.remove(+id);
  }

  @Get('/agent/:id')
  async getAgentBookings(@Param('id') id: string) {
    return this.umrahbookingsService.findUserBookings(+id)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('vender/only')
  async getVenderBookings(@currentUser()user:any) {
    return this.umrahbookingsService.findUserBookings(user.userId)
    
  }

 
}
