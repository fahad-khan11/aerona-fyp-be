import { Injectable } from '@nestjs/common';
import { CreateUmrahbookingDto } from './dto/create-umrahbooking.dto';
import { UpdateUmrahbookingDto } from './dto/update-umrahbooking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Umrah } from 'src/umrah/entities/umrah.entity';
import { Between, Repository } from 'typeorm';
import { Umrahbooking } from './entities/umrahbooking.entity';

@Injectable()
export class UmrahbookingsService {
  constructor(
        @InjectRepository(Umrahbooking)
        private readonly umrahBookingRepository: Repository<Umrahbooking>,
      ) {}
  create(createUmrahbookingDto: CreateUmrahbookingDto) {
    return this.umrahBookingRepository.save(createUmrahbookingDto);
  }

  findAll() {
    return this.umrahBookingRepository.find({
      relations:['umrahPurchased']
    })
  }

  findOne(id: number) {
    return this.umrahBookingRepository.findOne({
      where: { id: id },
    });
  }

  update(id: number, updateUmrahbookingDto: UpdateUmrahbookingDto) {
    return this.umrahBookingRepository.update(id, updateUmrahbookingDto);
  }

  remove(id: number) {
    return this.umrahBookingRepository.delete(id);
  }

  async findUserBookings(id:number){
    return this.umrahBookingRepository.find({
      where:{
        user:{
          id
        }
      },
      relations:['umrahPurchased','user'],
      order:{
        createdAt: 'DESC'
      }
    })
  }

  async findVendorBookings(id:number){
    return this.umrahBookingRepository.find({
      where:{
        umrahPurchased:{
          createdBy:{
            id
          }
        }
      },
    

      relations:['umrahPurchased','user'],
      order:{
        createdAt: 'DESC'
      }
    })
  }

  async umrahBookingStats(userId:number){
    const totalBookings=await this.umrahBookingRepository.count({
      where:{
        umrahPurchased:{
          createdBy:{
            id:userId
          }
        }
      }
    })
    const totalRevenue=await this.umrahBookingRepository.sum('totalPrice',{umrahPurchased:{
      createdBy:{
        id:userId
      }
      }
    }
    )
    const result = await this.umrahBookingRepository
  .createQueryBuilder('booking').
  leftJoin('booking.umrahPurchased','umrah')
  .leftJoin('umrah.createdBy','user')
  .select('umrah.packageType', 'packageType')
  .addSelect('COUNT(booking.id)', 'count')
  .where('user.id = :userId', { userId })
  .groupBy('umrah.packageType')
  .getRawMany();

  return {
    totalBookings,
    totalRevenue,
    result
  }

  }
    async hotelInvoiceAdmin() {
  
   const totalPayments = await this.umrahBookingRepository
  .createQueryBuilder("booking")
  .select(`SUM(booking.totalPrice)`, "Total")
  .getRawOne();
  

const monthWiseTotals = await this.umrahBookingRepository
  .createQueryBuilder("booking")
  .select("TO_CHAR(booking.createdAt, 'YYYY-MM')", "month")
  .addSelect("SUM(booking.totalPrice)", "total")
  .groupBy("month")
  .orderBy("month", "ASC")
  .getRawMany();

 const vendorTotals = await this.umrahBookingRepository
  .createQueryBuilder("booking")
  .leftJoin("booking.umrahPurchased", "hotel")
  .leftJoin("hotel.createdBy", "vendor")
  .select("vendor.id", "vendorId")
  .addSelect("vendor.name", "vendorName")
  .addSelect("SUM(booking.totalPrice)", "total")
  .groupBy("vendor.id")
  .addGroupBy("vendor.name")
  .orderBy("total", "DESC")
  .getRawMany();

 const monthWiseVendorTotals = await this.umrahBookingRepository
  .createQueryBuilder("booking")
  .leftJoin("booking.umrahPurchased", "hotel")
  .leftJoin("hotel.createdBy", "vendor")
  .select("vendor.id", "vendorId")
  .addSelect("vendor.name", "vendorName")
  .addSelect("TO_CHAR(booking.createdAt, 'YYYY-MM')", "month")
  .addSelect("SUM(booking.totalPrice)", "total") // 👈 overall total
  .groupBy("vendor.id")
  .addGroupBy("vendor.name")
  .addGroupBy("month")
  .orderBy("vendor.id", "ASC")
  .addOrderBy("month", "ASC")
  .getRawMany();

  return {
    totalPayments,
    monthWiseTotals,
    vendorTotals,
    monthWiseVendorTotals,
  }
  }
   async findTotalBookings() {
    const totalAmount = await this.umrahBookingRepository
      .createQueryBuilder('booking')
      .select('SUM(booking.totalPrice)', 'totalAmount')
      .getRawOne();
    const totalBookings = await this.umrahBookingRepository.count();
    return {
      totalAmount: totalAmount,
      totalBookings: totalBookings
    }
  }
   async getInvoiceSum(vendorId: number, startDate: Date, endDate: Date) {
   
     return await this.umrahBookingRepository.sum('totalPrice',{
      createdAt: Between(startDate,endDate),
      umrahPurchased:{
        createdBy:{
          id: vendorId
        }
      }
     })
    }
}
