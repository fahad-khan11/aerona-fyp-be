import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { In, MoreThan, MoreThanOrEqual, Repository } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room) private readonly roomRepository: Repository<Room>,
  ) { }
  create(createRoomDto: CreateRoomDto) {
    return this.roomRepository.save(createRoomDto);
  }

  findAll() {
    return this.roomRepository.find();
  }

  async findByHotelId(hotelId: number, targetDate: Date) {
    const availableHotels = await this.roomRepository
      .createQueryBuilder('room')
  .leftJoinAndSelect('room.hotel', 'hotel')
  .where('hotel.id = :hotelId', { hotelId })
  .andWhere('(room.availableUntil IS NULL OR room.availableUntil < :targetDate)', { targetDate })
  .getMany();
    return availableHotels
  }
  async findByIds(ids: Room[]) {
    return this.roomRepository.find({
      where: {
        id: In(ids),
      }
    });
  }

  findOne(id: number) {
    return this.roomRepository.findOne({
      where: {
        id,
      },
    });
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    return this.roomRepository.update(id, updateRoomDto);
  }

  getHotelRooms(id: number) {
    return this.roomRepository.find({
      where: {
        hotel: {
          id
        }
      },
      relations: {
        hotel: true
      }
    });

  }
  remove(id: number) {
    return this.roomRepository.delete(id);
  }

  @Cron(CronExpression.EVERY_HOUR)
  async updateRoomAvailability() {
    const now = new Date();
    await this.roomRepository
      .createQueryBuilder()
      .update(Room)
      .set({ isActive: true, availableUntil: null })
      .where('unavailableUntil < :now', { now })
      .execute();
  }
}
