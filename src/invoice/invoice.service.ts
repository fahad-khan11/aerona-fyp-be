import { Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { InjectRepository } from '@nestjs/typeorm';

import { Between, Repository } from 'typeorm';
import { Invoice } from './entities/invoice.entity';

@Injectable()
export class InvoiceService {
  constructor(@InjectRepository(Invoice) private invoiceRepository: Repository<Invoice>) {


  }
  async create(createInvoiceDto: CreateInvoiceDto) {
    return this.invoiceRepository.save(createInvoiceDto);
  }

  findAll() {
    return this.invoiceRepository.find();
  }

  findOne(id: number) {
    return this.invoiceRepository.findOne({
      where: {
        id
      }
    })
  }

  update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
    return this.invoiceRepository.update(id, updateInvoiceDto);
  }

  remove(id: number) {
    return this.invoiceRepository.delete(id)
  }

  getVendorInvoice(id: number) {
    if(id==0){
      return this.invoiceRepository.find({
        where:{
          isFlightBooking:true
        },
        order:{
          updatedAt: 'DESC'
        }
      })
    }
    return this.invoiceRepository.find({
      where: {
        vendorId: id
      }
    })
  }

  async findInvoiceByDate(fromDate: Date, toDate: Date, id: number) {
  if(id==0){
       return await this.invoiceRepository.findOne({
      where: [{
        startDate: Between(fromDate, toDate),
        isFlightBooking:true

      }, {
        endDate: Between(fromDate, toDate),
        isFlightBooking:true
        

      }

      ]
    })
  }

    return await this.invoiceRepository.findOne({
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
