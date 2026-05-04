import { Injectable } from '@nestjs/common';
import { CreateUmrahDto } from './dto/create-umrah.dto';
import { UpdateUmrahDto } from './dto/update-umrah.dto';
import { Umrah } from './entities/umrah.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';

@Injectable()
export class UmrahService {
  constructor(
      @InjectRepository(Umrah)
      private readonly umrahRepository: Repository<Umrah>,
    ) {}
  create(createUmrahDto: CreateUmrahDto) {
    return this.umrahRepository.save(createUmrahDto);
  }

  findAll(packageType: string,duration:number,city:string) {
    return this.umrahRepository.find({
      where:{
        packageType,
        duration,
        //  startDate: MoreThan(new Date()),
         departureCity:city
      }
    });
  }

  async findByVendor(id:number){
    return this.umrahRepository.find({
      where:{
        createdBy:{
          id
        }
      }
    })

  }

  findOne(id: number) {
    return this.umrahRepository.findOne({
      where:{
        id
      },
      relations:['createdBy']
    })
  }

  update(id: number, updateUmrahDto: UpdateUmrahDto) {
    return this.umrahRepository.update(id, updateUmrahDto);
  }

  remove(id: number) {
    return this.umrahRepository.delete(id);
  }

  async getStats(id:number){
   return this.umrahRepository.count({
    where:{
      createdBy:{
        id
      }
    }
   })
  }
}
