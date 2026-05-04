import { Injectable } from '@nestjs/common';
import { CreateHotelInvoiceDto } from './dto/create-hotel-invoice.dto';
import { UpdateHotelInvoiceDto } from './dto/update-hotel-invoice.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HotelInvoice } from './entities/hotel-invoice.entity';
import { Between, Repository } from 'typeorm';

@Injectable()
export class HotelInvoiceService {
  constructor(@InjectRepository(HotelInvoice) private hotelInvoiceRepository: Repository<HotelInvoice>) {


  }
  create(createHotelInvoiceDto: CreateHotelInvoiceDto) {
    return this.hotelInvoiceRepository.save(createHotelInvoiceDto);
  }

  findAll() {
    return this.hotelInvoiceRepository.find();
  }

  findOne(id: number) {
    return this.hotelInvoiceRepository.find({
      where: {
        vendorId:id
      },
      order:{
        createdAt:'DESC'
      }
    });
  }

  update(id: number, updateHotelInvoiceDto: UpdateHotelInvoiceDto) {
    return this.hotelInvoiceRepository.update(id, updateHotelInvoiceDto);
  }

  remove(id: number) {
    return this.hotelInvoiceRepository.delete(id)
  }
  async findInvoiceByDate(fromDate: Date, toDate: Date, id: number) {
    return await this.hotelInvoiceRepository.findOne({
      where: [{
        startDate: Between(fromDate, toDate),
        vendorId: id
      }, {
        endDate: Between(fromDate, toDate),
        vendorId: id

      }

      ]
    })




  }
}
