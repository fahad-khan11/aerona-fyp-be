import { Injectable } from '@nestjs/common';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Hotel } from './entities/hotel.entity';
import { Status } from 'src/user/entities/user.entity';

@Injectable()
export class HotelsService {
  constructor(
    @InjectRepository(Hotel)
    private readonly hotelRepository: Repository<Hotel>,
  ) {}
  create(createHotelDto: CreateHotelDto) {
    return this.hotelRepository.save(createHotelDto);
  }

  findAll(id: number) {
    return this.hotelRepository.find({
      where: {
        user:{
          id
        }
      },
    });
  }

  async findAllHotels(location?: string) {

    location =location?.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    console.log(location)
    return await this.hotelRepository.find({
      where:{
        city:location ? ILike(`%${location}%`) : undefined,
        dataByApi:false,
        status:Status.APPROVED

      },
      order:{
        createdAt:'DESC'
      }


    })
  }

  // async findAllHotelsAdmin() {

    
  //   return await this.hotelRepository.find({
  //     where:{
       
  //       dataByApi:false,

  //     }


  //   })
  // }

  async findAllHotelsAdmin(page: number = 1, limit: number = 10,status?:Status) {
    
 
   
  const skip = (page - 1) * limit;

  const [hotels, total] = await this.hotelRepository.findAndCount({
    where: { dataByApi: false,
      status: status
     },
    skip,
    take: limit,
    order: { id: 'DESC' }, // optional, sorts by latest first
  });

  return {
    data: hotels,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

 async getAgodaHotel(id:string){
    return await this.hotelRepository.find({
      where:{
        apiId:id,
        dataByApi:true
      }
    })
 }

  async findPendingHotel(id:number){
    return await this.hotelRepository.find({
      where: {
        user:{
          id
        },
        isCompleted:0
      }
    })

  }

    async findVendorHotelsCount(id:number){
      const totalHotels= await this.hotelRepository.count({
        where:{
          user:{
            id
          }
        }
      })
      const completedHotels= await this.hotelRepository.count({
        where:{
          user:{
            id
          },
          isCompleted:1
        }
      })
      const pendingHotels= await this.hotelRepository.count({
        where:{
          user:{
            id
          },
          isCompleted:0
        }
      }
      )
      return {totalHotels:totalHotels,completedHotels:completedHotels,pendingHotels:pendingHotels}
    } 
    async findCompletedHotel(id:number){
    return await this.hotelRepository.find({
      where: {
        user:{
          id
        },
        isCompleted:1
      }
    })

  }

  findOne(id: number) {
    return this.hotelRepository.findOne({
      where: { id },
    });
  }

  update(id: number, updateHotelDto: UpdateHotelDto) {
    return this.hotelRepository.update(id, updateHotelDto);
  }

  remove(id: number) {
    return this.hotelRepository.delete(id);
  }
}
