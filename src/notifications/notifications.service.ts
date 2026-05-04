import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';

@Injectable()
export class NotificationsService {
   constructor(@InjectRepository(Notification) private notificationRepository: Repository<Notification>) {
    // this.notificationRepository = notificationRepository;

  }
  create(createNotificationDto: CreateNotificationDto) {
    return this.notificationRepository.save(createNotificationDto);
  }

  findAll() {
    return this.notificationRepository.find({
      relations:['notificationFor']
    });
  }

  findOne(id: number) {
    return this.notificationRepository.findOne({where:{id}});
  }

  update(id: number, updateNotificationDto: UpdateNotificationDto) {
    return this.notificationRepository.update(id, updateNotificationDto);
  }

  remove(id: number) {
    return this.notificationRepository.delete(id);
  }
  findUserNotifications(userId: number) {
    return this.notificationRepository.find({
      where: {
        notificationFor: {
          id: userId
        },
        
      },
      order: {
        createdAt: 'DESC'
      },
      relations:['notificationFor']
    })
  }
}
