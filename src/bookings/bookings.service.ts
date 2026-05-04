import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking, PaymentType } from './entities/booking.entity';
import { Between, IsNull, LessThan, MoreThan, Repository } from 'typeorm';
import { Favourites } from './entities/favourites.entity';
import { CreateFavouriteDto } from './dto/create-favourite.dto';
import { Role } from 'src/user/entities/user.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking) private bookingRepository: Repository<Booking>,
    @InjectRepository(Favourites)
    private favouritesRepository: Repository<Favourites>,
  ) { }
  create(createBookingDto: CreateBookingDto) {
    return this.bookingRepository.save(createBookingDto);
  }

  createFavourite(createFavouriteDto: CreateFavouriteDto) {
    return this.favouritesRepository.save(createFavouriteDto);
  }

  removeFavourite(id: number) {
    return this.favouritesRepository.delete(id);
  }

  findFavourite(userId: number, hotelId: number) {
    return this.favouritesRepository.find({
      where: {
        user: { id: userId },
        hotel: { id: hotelId },
      },
    });
  }

  findUserFavourites(id: number) {
    return this.favouritesRepository.find({
      where: { user: { id } },
      relations: ['hotel'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  findAll(paymnetType: PaymentType) {
    return this.bookingRepository.find({
      relations: ['hotel', 'user', 'room'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  findUpComing(id: number) {
    return this.bookingRepository.find({
      where: {
        user: { id: id },
        checkIndate: MoreThan(new Date(Date.now() - 86400000)),
        isActive: true,
      },
      relations: ['hotel', 'room'],
      order: {
        createdAt: 'DESC',
      },
    });
  }
  findPast(id: number) {
    return this.bookingRepository.find({
      where: {
        user: { id: id },
        checkIndate: LessThan(new Date(Date.now() - 86400000)),
        isActive: true,
      },
      relations: ['hotel', 'room'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  findCancelled(id: number) {
    return this.bookingRepository.find({
      where: {
        user: { id: id },
        isActive: false,
      },
      relations: ['hotel', 'room'],
      order: {
        createdAt: 'DESC',
      },
    });
  }
  findHotelBookings(hotelId: number) {
    return this.bookingRepository.find({
      where: { hotel: { id: hotelId } },
      relations: ['hotel', 'user', 'room'],
      order: {
        createdAt: 'DESC',
      },
    });
  }
  findUserBookings(id: number) {
    return this.bookingRepository.find({
      where: { user: { id } },
      relations: ['hotel', 'user', 'room'],
    });
  }
  async findAllVendorDashBoardStats(id: number) {
    const totalBookings = await this.bookingRepository.count({
      where: {
        hotel: {
          user: {
            id
          }
        }
      }
    })
    const cancelledBookings = await this.bookingRepository.count({
      where: {
        hotel: {
          user: {
            id
          }
        },
        isActive: false
      }
    })
    return { totalBookings: totalBookings, cancelledBookings: cancelledBookings }

  }
  findOne(id: number) {
    return this.bookingRepository.findOne({ where: { id: id }, relations: ['hotel','hotel.user','user'] });
  }

  update(id: number, updateBookingDto: UpdateBookingDto) {
    return this.bookingRepository.update(id, updateBookingDto);
  }

  remove(id: number) {
    return this.bookingRepository.delete(id);
  }

  async getVendorPayments(hotelId: number, startDate: Date, endDate: Date) {
    const bookings = await this.bookingRepository.find({
      where: { hotel: { id: hotelId }, checkIndate: Between(startDate, endDate) }

    })
    const totalAmount = bookings.reduce((acc, booking) => acc + booking.amount, 0);
    return {
      startDate: startDate,
      endDate: endDate,
      totalAmount: totalAmount,

    }
  }
  async getVendorPaymentsDetails(hotelId: number, startDate: Date, endDate: Date) {
    const bookings = await this.bookingRepository.find({
      where: { hotel: { id: hotelId }, checkIndate: Between(startDate, endDate) },
      relations: ['user']

    })
    return bookings

  }

  async findTotalBookings() {
    const totalAmount = await this.bookingRepository
      .createQueryBuilder('booking')
      .select('SUM(booking.amount)', 'totalAmount')
      .where('booking.isActive = :isActive', { isActive: true })
      .getRawOne();

    const totalBookings = await this.bookingRepository.count({
      where: {
        isActive: true
      }
    });
    return {
      totalAmount: totalAmount,
      totalBookings: totalBookings
    }
  }

  async hotelInvoiceAdmin() {

    const totalPayments = await this.bookingRepository
      .createQueryBuilder("booking")
      .select(`SUM(CASE WHEN booking.paymentType = 'online' THEN booking.amount ELSE 0 END)`, "onlineTotal")
      .addSelect(`SUM(CASE WHEN booking.paymentType = 'payathotel' THEN booking.amount ELSE 0 END)`, "payAtHotelTotal")
      .addSelect("SUM(booking.amount)", "total")
      .where('booking.isActive = :isActive', { isActive: true })
      .getRawOne();


    const monthWiseTotals = await this.bookingRepository
      .createQueryBuilder("booking")
      .select("TO_CHAR(booking.createdAt, 'YYYY-MM')", "month")
      .addSelect(`SUM(CASE WHEN booking.paymentType = 'online' THEN booking.amount ELSE 0 END)`, "onlineTotal")
      .addSelect(`SUM(CASE WHEN booking.paymentType = 'payathotel' THEN booking.amount ELSE 0 END)`, "payAtHotelTotal")
      .addSelect("SUM(booking.amount)", "total")
      .where('booking.isActive = :isActive', { isActive: true })
      .groupBy("month")
      .orderBy("month", "ASC")
      .getRawMany();

    const vendorTotals = await this.bookingRepository
      .createQueryBuilder("booking")
      .leftJoin("booking.hotel", "hotel")
      .leftJoin("hotel.user", "vendor")
      .select("vendor.id", "vendorId")
      .addSelect("vendor.name", "vendorName")
      .addSelect(`SUM(CASE WHEN booking.paymentType = 'online' THEN booking.amount ELSE 0 END)`, "onlineTotal")
      .addSelect(`SUM(CASE WHEN booking.paymentType = 'payathotel' THEN booking.amount ELSE 0 END)`, "payAtHotelTotal")
      .addSelect("SUM(booking.amount)", "total")
      .where('booking.isActive = :isActive', { isActive: true })
      .groupBy("vendor.id")
      .addGroupBy("vendor.name")
      .orderBy("total", "DESC")
      .getRawMany();

    const monthWiseVendorTotals = await this.bookingRepository
      .createQueryBuilder("booking")
      .leftJoin("booking.hotel", "hotel")
      .leftJoin("hotel.user", "vendor")
      .select("vendor.id", "vendorId")
      .addSelect("vendor.name", "vendorName")
      .addSelect("TO_CHAR(booking.createdAt, 'YYYY-MM')", "month")
      .addSelect(`SUM(CASE WHEN booking.paymentType = 'online' THEN booking.amount ELSE 0 END)`, "onlineTotal")
      .addSelect(`SUM(CASE WHEN booking.paymentType = 'payathotel' THEN booking.amount ELSE 0 END)`, "payAtHotelTotal")
      .addSelect("SUM(booking.amount)", "total")
      .where('booking.isActive = :isActive', { isActive: true }) // 👈 overall total
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


  async findVendorInvoice(monthYear: string, vendorId: number) {
    const result = await this.bookingRepository
      .createQueryBuilder("booking")
      .leftJoin("booking.hotel", "hotel")
      .leftJoin("hotel.user", "vendor")
      .select("vendor.id", "vendorId")
      .addSelect("vendor.name", "vendorName")
      .addSelect(`SUM(CASE WHEN booking.paymentType = 'online' THEN booking.amount ELSE 0 END)`, "onlineTotal")
      .addSelect(`SUM(CASE WHEN booking.paymentType = 'payathotel' THEN booking.amount ELSE 0 END)`, "payAtHotelTotal")
      .addSelect("SUM(booking.amount)", "total")
      .where("TO_CHAR(booking.createdAt, 'YYYY-MM') = :monthYear", { monthYear })
      .andWhere("vendor.id = :vendorId", { vendorId })
      .andWhere('booking.isActive = :isActive', { isActive: true })
      .groupBy("vendor.id")
      .addGroupBy("vendor.name")
      .getRawMany();

    return result;

  }






  async findMonthWiseRevenue() {
    const bookings = await this.bookingRepository
      .createQueryBuilder('booking')
      .select("TO_CHAR(DATE_TRUNC('month', booking.checkIndate), 'YYYY-MM')", 'month')
      .addSelect('SUM(booking.amount)', 'totalAmount')
      .where('booking.isActive = :isActive', { isActive: true })
      .groupBy("DATE_TRUNC('month', booking.checkIndate)")
      .orderBy('month', 'ASC')
      .getRawMany();


    return bookings

  }

  async findMonthBookingsForVendor(vendorId: number, monthYear: string) {

    const [year, month] = monthYear.split('-').map(Number);


    const startDate = new Date(year, month - 1, 1);

    const endDate = new Date(year, month, 0, 23, 59, 59);


    return this.bookingRepository.find({
      where: {
        checkIndate: Between(startDate, endDate),
        hotel:
        {
          user: {
            id: vendorId
          }


        },

      }
    })
  }

  async findMonthAgentComission(userId: number) {
    return this.bookingRepository
      .createQueryBuilder('booking')
      .select([
        `TO_CHAR(booking.checkIndate, 'YYYY-MM') AS month`,  // e.g., "2025-10"
        `SUM(booking.amount)::float AS totalAmount`,        // sum for that month
        `COUNT(booking.id)::int AS totalBookings`,          // count of bookings
      ])
      .where('booking.userId = :userId', { userId })
      .groupBy('month')
      .orderBy('month', 'ASC')
      .getRawMany();

  }

  async getInvoiceSum(vendorId: number, startDate: Date, endDate: Date) {

    const total = await this.bookingRepository.sum('amount', {
      checkIndate: Between(startDate, endDate),
      hotel: {
        user: {
          id: vendorId
        }
      }
    })

    const onlineTotal = await this.bookingRepository.sum('amount', {
      checkIndate: Between(startDate, endDate),
      paymentType: PaymentType.ONLINE,
      hotel: {
        user: {
          id: vendorId
        }
      }
    })

    const payAtHotelTotal = await this.bookingRepository.sum('amount', {
      checkIndate: Between(startDate, endDate),
      paymentType: PaymentType.PAYATHOTEL,
      hotel: {
        user: {
          id: vendorId
        }
      }
    })

    return {
      total,
      onlineTotal,
      payAtHotelTotal
    }

  }


}
